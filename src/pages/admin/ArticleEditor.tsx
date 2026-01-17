import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, apiFormRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Save,
  Upload,
  FileText,
  Image,
  Settings,
  Search,
  Loader2,
  X,
  Plus,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  author: string | null;
  status: string;
  tags: string | null;
  viewCount: number;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  focusKeyword: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  robotsDirective: string | null;
  readingTime: string | null;
  publishedAt: string | null;
  scheduledAt: string | null;
}

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const htmlInputRef = useRef<HTMLInputElement>(null);
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "فريق الفرسان",
    status: "draft",
    tags: [] as string[],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    focusKeyword: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    robotsDirective: "index,follow",
    scheduledAt: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: ["admin-article", id],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/admin/articles/${id}`);
      if (!response.ok) throw new Error("فشل تحميل المقال");
      return response.json();
    },
    enabled: isEditing,
  });

  useEffect(() => {
    if (article) {
      let tags: string[] = [];
      if (article.tags) {
        try {
          tags = JSON.parse(article.tags);
        } catch {
          tags = article.tags.split(",").map((t) => t.trim());
        }
      }
      setFormData({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || "",
        content: article.content || "",
        coverImage: article.coverImage || "",
        author: article.author || "فريق الفرسان",
        status: article.status,
        tags,
        metaTitle: article.metaTitle || "",
        metaDescription: article.metaDescription || "",
        metaKeywords: article.metaKeywords || "",
        focusKeyword: article.focusKeyword || "",
        canonicalUrl: article.canonicalUrl || "",
        ogTitle: article.ogTitle || "",
        ogDescription: article.ogDescription || "",
        ogImage: article.ogImage || "",
        robotsDirective: article.robotsDirective || "index,follow",
        scheduledAt: article.scheduledAt
          ? new Date(article.scheduledAt).toISOString().slice(0, 16)
          : "",
      });
      if (article.coverImage) {
        setCoverImagePreview(article.coverImage);
      }
    }
  }, [article]);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s\u0600-\u06FF-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug || createSlug(value),
    }));
  };

  const calculateReadingTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, "");
    const wordCount = text.split(/\s+/).filter((word) => word).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} دقيقة`;
  };

  const saveMutation = useMutation({
    mutationFn: async (status: string) => {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("slug", formData.slug);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      data.append("author", formData.author);
      data.append("status", status);
      data.append("tags", JSON.stringify(formData.tags));
      data.append("metaTitle", formData.metaTitle);
      data.append("metaDescription", formData.metaDescription);
      data.append("metaKeywords", formData.metaKeywords);
      data.append("focusKeyword", formData.focusKeyword);
      data.append("canonicalUrl", formData.canonicalUrl);
      data.append("ogTitle", formData.ogTitle);
      data.append("ogDescription", formData.ogDescription);
      data.append("ogImage", formData.ogImage);
      data.append("robotsDirective", formData.robotsDirective);
      data.append("readingTime", calculateReadingTime(formData.content));
      if (formData.scheduledAt) {
        data.append("scheduledAt", formData.scheduledAt);
      }
      if (coverImageFile) {
        data.append("coverImage", coverImageFile);
      } else if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }

      const url = isEditing
        ? `/api/admin/articles/${id}`
        : "/api/admin/articles";
      const method = isEditing ? "PUT" : "POST";

      const response = await apiFormRequest(method, url, data);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: (data, status) => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast({
        title: status === "published" ? "تم نشر المقال" : "تم حفظ المقال",
      });
      navigate("/admin/articles");
    },
    onError: (error: Error) => {
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isImporting, setIsImporting] = useState(false);

  const handleHtmlImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const response = await fetch("/api/admin/import-html", {
        method: "POST",
        body: formDataUpload,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        title: data.title || prev.title,
        slug: prev.slug || createSlug(data.title),
        content: data.content || prev.content,
        excerpt: data.excerpt || prev.excerpt,
        metaTitle: data.metaTitle || prev.metaTitle,
        metaDescription: data.metaDescription || prev.metaDescription,
        metaKeywords: data.metaKeywords || prev.metaKeywords,
        focusKeyword: data.focusKeyword || prev.focusKeyword,
        ogTitle: data.ogTitle || prev.ogTitle,
        ogDescription: data.ogDescription || prev.ogDescription,
        ogImage: data.ogImage || prev.ogImage,
        canonicalUrl: data.canonicalUrl || prev.canonicalUrl,
        robotsDirective: data.robotsDirective || prev.robotsDirective,
      }));

      toast({ title: "تم استيراد HTML بنجاح", description: "تم استخراج المحتوى وبيانات SEO" });
    } catch (error: any) {
      toast({
        title: "خطأ في الاستيراد",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      if (htmlInputRef.current) {
        htmlInputRef.current.value = "";
      }
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  if (isEditing && isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/articles")}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">
            {isEditing ? "تعديل المقال" : "مقال جديد"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={htmlInputRef}
            accept=".html,.htm"
            onChange={handleHtmlImport}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => htmlInputRef.current?.click()}
            disabled={isImporting}
          >
            {isImporting ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="ml-2 h-4 w-4" />
            )}
            استيراد HTML
          </Button>
          <Button
            variant="outline"
            onClick={() => saveMutation.mutate("draft")}
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
            <Save className="ml-2 h-4 w-4" />
            حفظ كمسودة
          </Button>
          {formData.scheduledAt && (
            <Button
              variant="secondary"
              onClick={() => saveMutation.mutate("scheduled")}
              disabled={saveMutation.isPending || !formData.title || !formData.content}
            >
              {saveMutation.isPending && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
              <Calendar className="ml-2 h-4 w-4" />
              جدولة النشر
            </Button>
          )}
          <Button
            onClick={() => saveMutation.mutate("published")}
            disabled={saveMutation.isPending || !formData.title || !formData.content}
          >
            {saveMutation.isPending && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
            نشر
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                المحتوى الأساسي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>العنوان *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="عنوان المقال"
                />
              </div>
              <div className="space-y-2">
                <Label>الرابط (Slug)</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="article-slug"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label>الملخص</Label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="ملخص قصير للمقال..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>المحتوى *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) =>
                    setFormData({ ...formData, content })
                  }
                  placeholder="ابدأ بكتابة المقال..."
                />
                <p className="text-xs text-gray-500">
                  استخدم شريط الأدوات للتنسيق أو استورد ملف HTML
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                تحسين محركات البحث (SEO)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>الكلمة المفتاحية الرئيسية</Label>
                <Input
                  value={formData.focusKeyword}
                  onChange={(e) =>
                    setFormData({ ...formData, focusKeyword: e.target.value })
                  }
                  placeholder="الكلمة المفتاحية الرئيسية"
                />
              </div>
              <div className="space-y-2">
                <Label>عنوان الصفحة (Meta Title)</Label>
                <Input
                  value={formData.metaTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, metaTitle: e.target.value })
                  }
                  placeholder="عنوان الصفحة لمحركات البحث"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500">
                  {formData.metaTitle.length}/60 حرف
                </p>
              </div>
              <div className="space-y-2">
                <Label>وصف الصفحة (Meta Description)</Label>
                <Textarea
                  value={formData.metaDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, metaDescription: e.target.value })
                  }
                  placeholder="وصف الصفحة لمحركات البحث"
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  {formData.metaDescription.length}/160 حرف
                </p>
              </div>
              <div className="space-y-2">
                <Label>الكلمات المفتاحية (Meta Keywords)</Label>
                <Input
                  value={formData.metaKeywords}
                  onChange={(e) =>
                    setFormData({ ...formData, metaKeywords: e.target.value })
                  }
                  placeholder="كلمة1, كلمة2, كلمة3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الرابط القانوني (Canonical)</Label>
                  <Input
                    value={formData.canonicalUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, canonicalUrl: e.target.value })
                    }
                    placeholder="https://..."
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>توجيهات الروبوتات</Label>
                  <Select
                    value={formData.robotsDirective}
                    onValueChange={(value) =>
                      setFormData({ ...formData, robotsDirective: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="index,follow">Index, Follow</SelectItem>
                      <SelectItem value="noindex,follow">NoIndex, Follow</SelectItem>
                      <SelectItem value="index,nofollow">Index, NoFollow</SelectItem>
                      <SelectItem value="noindex,nofollow">NoIndex, NoFollow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <h4 className="font-medium">Open Graph (للمشاركة)</h4>
              <div className="space-y-2">
                <Label>عنوان المشاركة (OG Title)</Label>
                <Input
                  value={formData.ogTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, ogTitle: e.target.value })
                  }
                  placeholder="عنوان يظهر عند المشاركة"
                />
              </div>
              <div className="space-y-2">
                <Label>وصف المشاركة (OG Description)</Label>
                <Textarea
                  value={formData.ogDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, ogDescription: e.target.value })
                  }
                  placeholder="وصف يظهر عند المشاركة"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>صورة المشاركة (OG Image)</Label>
                <Input
                  value={formData.ogImage}
                  onChange={(e) =>
                    setFormData({ ...formData, ogImage: e.target.value })
                  }
                  placeholder="رابط الصورة"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                صورة الغلاف
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
              {coverImagePreview ? (
                <div className="relative">
                  <img
                    src={coverImagePreview}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 left-2"
                    onClick={() => {
                      setCoverImageFile(null);
                      setCoverImagePreview(null);
                      setFormData({ ...formData, coverImage: "" });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">اضغط لرفع صورة</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                الإعدادات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>الكاتب</Label>
                <Input
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>التصنيفات</Label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="أضف تصنيف"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" size="icon" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                      <X className="h-3 w-3 mr-1" />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>جدولة النشر</Label>
                <Input
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) =>
                    setFormData({ ...formData, scheduledAt: e.target.value })
                  }
                  dir="ltr"
                />
                <p className="text-xs text-gray-500">
                  اتركه فارغاً للنشر الفوري
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                  وقت القراءة:{" "}
                  <span className="font-medium">
                    {calculateReadingTime(formData.content)}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
