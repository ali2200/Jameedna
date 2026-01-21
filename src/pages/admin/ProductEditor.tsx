import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Package, Save, ArrowRight, Upload, X, Loader2 } from "lucide-react";

interface Product {
  id: number;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string | null;
  descriptionEn: string | null;
  ingredientsAr: string | null;
  ingredientsEn: string | null;
  featuresAr: string | null;
  featuresEn: string | null;
  sizesAr: string | null;
  sizesEn: string | null;
  certificates: string | null;
  image: string | null;
  gradientFrom: string | null;
  gradientTo: string | null;
  isActive: boolean;
  sortOrder: number;
}

export default function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    slug: "",
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    ingredientsAr: "",
    ingredientsEn: "",
    featuresAr: "",
    featuresEn: "",
    sizesAr: "",
    sizesEn: "",
    certificates: "",
    image: "",
    gradientFrom: "#1e3a5f",
    gradientTo: "#3b82f6",
    isActive: true,
    sortOrder: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["admin-product", id],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/admin/products/${id}`);
      if (!response.ok) throw new Error("فشل تحميل المنتج");
      return response.json();
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        slug: product.slug,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        descriptionAr: product.descriptionAr || "",
        descriptionEn: product.descriptionEn || "",
        ingredientsAr: product.ingredientsAr || "",
        ingredientsEn: product.ingredientsEn || "",
        featuresAr: product.featuresAr || "",
        featuresEn: product.featuresEn || "",
        sizesAr: product.sizesAr || "",
        sizesEn: product.sizesEn || "",
        certificates: product.certificates || "",
        image: product.image || "",
        gradientFrom: product.gradientFrom || "#1e3a5f",
        gradientTo: product.gradientTo || "#3b82f6",
        isActive: product.isActive,
        sortOrder: product.sortOrder,
      });
      if (product.image) {
        setImagePreview(product.image);
      }
    }
  }, [product]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, String(value));
      });
      if (imageFile) {
        data.append("image", imageFile);
      }

      const url = isEditing
        ? `/api/admin/products/${id}`
        : "/api/admin/products";
      const method = isEditing ? "PUT" : "POST";
      const response = await apiRequest(method, url, data);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل حفظ المنتج");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({ title: isEditing ? "تم تحديث المنتج" : "تم إنشاء المنتج" });
      navigate("/admin/products");
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData({ ...formData, image: "" });
  };

  const generateSlug = () => {
    const slug = formData.nameEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData({ ...formData, slug });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/products")}>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="h-8 w-8" />
              {isEditing ? "تعديل المنتج" : "منتج جديد"}
            </h1>
          </div>
        </div>
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="ml-2 h-4 w-4" />
          )}
          حفظ المنتج
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="arabic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="arabic">المحتوى العربي</TabsTrigger>
              <TabsTrigger value="english">English Content</TabsTrigger>
            </TabsList>

            <TabsContent value="arabic" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>المعلومات الأساسية (عربي)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>اسم المنتج</Label>
                    <Input
                      value={formData.nameAr}
                      onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                      placeholder="جميدنا زمان"
                    />
                  </div>
                  <div>
                    <Label>الوصف</Label>
                    <Textarea
                      value={formData.descriptionAr}
                      onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                      placeholder="وصف المنتج بالعربية..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>المكونات (سطر لكل مكون)</Label>
                    <Textarea
                      value={formData.ingredientsAr}
                      onChange={(e) => setFormData({ ...formData, ingredientsAr: e.target.value })}
                      placeholder="حليب غنم طازج&#10;ملح طبيعي&#10;منفحة طبيعية"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>المميزات (سطر لكل ميزة)</Label>
                    <Textarea
                      value={formData.featuresAr}
                      onChange={(e) => setFormData({ ...formData, featuresAr: e.target.value })}
                      placeholder="100% طبيعي&#10;بدون مواد حافظة&#10;صنع يدوي تقليدي"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>الأحجام المتاحة (سطر لكل حجم)</Label>
                    <Textarea
                      value={formData.sizesAr}
                      onChange={(e) => setFormData({ ...formData, sizesAr: e.target.value })}
                      placeholder="500 جرام&#10;1 كيلو&#10;5 كيلو"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="english" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information (English)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Product Name</Label>
                    <Input
                      value={formData.nameEn}
                      onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                      placeholder="Jameedna Zaman"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={formData.descriptionEn}
                      onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                      placeholder="Product description in English..."
                      rows={4}
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label>Ingredients (one per line)</Label>
                    <Textarea
                      value={formData.ingredientsEn}
                      onChange={(e) => setFormData({ ...formData, ingredientsEn: e.target.value })}
                      placeholder="Fresh sheep milk&#10;Natural salt&#10;Natural rennet"
                      rows={4}
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label>Features (one per line)</Label>
                    <Textarea
                      value={formData.featuresEn}
                      onChange={(e) => setFormData({ ...formData, featuresEn: e.target.value })}
                      placeholder="100% Natural&#10;No preservatives&#10;Traditional handmade"
                      rows={4}
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label>Available Sizes (one per line)</Label>
                    <Textarea
                      value={formData.sizesEn}
                      onChange={(e) => setFormData({ ...formData, sizesEn: e.target.value })}
                      placeholder="500g&#10;1kg&#10;5kg"
                      rows={3}
                      dir="ltr"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المنتج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>الرابط (Slug)</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="jameedna-zaman"
                    dir="ltr"
                  />
                  <Button type="button" variant="outline" onClick={generateSlug}>
                    توليد
                  </Button>
                </div>
              </div>

              <div>
                <Label>الشهادات (مفصولة بفاصلة)</Label>
                <Input
                  value={formData.certificates}
                  onChange={(e) => setFormData({ ...formData, certificates: e.target.value })}
                  placeholder="ISO, HACCP, Halal"
                  dir="ltr"
                />
              </div>

              <div>
                <Label>ترتيب العرض</Label>
                <Input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>حالة المنتج</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <span className="text-sm text-gray-500">
                    {formData.isActive ? "مفعّل" : "معطّل"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>صورة المنتج</CardTitle>
            </CardHeader>
            <CardContent>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Product"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 left-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">اضغط لرفع صورة</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ألوان التدرج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="h-20 rounded-lg"
                style={{
                  background: `linear-gradient(135deg, ${formData.gradientFrom}, ${formData.gradientTo})`,
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>اللون الأول</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.gradientFrom}
                      onChange={(e) => setFormData({ ...formData, gradientFrom: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={formData.gradientFrom}
                      onChange={(e) => setFormData({ ...formData, gradientFrom: e.target.value })}
                      dir="ltr"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>اللون الثاني</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.gradientTo}
                      onChange={(e) => setFormData({ ...formData, gradientTo: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={formData.gradientTo}
                      onChange={(e) => setFormData({ ...formData, gradientTo: e.target.value })}
                      dir="ltr"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
