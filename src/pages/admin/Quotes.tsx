import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Mail, Phone, Building, Clock, Check, Trash2, Package, Globe, ShoppingBag, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { exportToCSV, quotesHeaders } from "@/lib/exportToExcel";

interface Quote {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  country: string | null;
  product: string | null;
  quantity: string | null;
  message: string | null;
  isRead: boolean;
  createdAt: string;
}

export default function AdminQuotes() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: quotes, isLoading } = useQuery<Quote[]>({
    queryKey: ["admin-quotes"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/quotes");
      if (!response.ok) throw new Error("فشل تحميل الطلبات");
      return response.json();
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("PATCH", `/api/admin/quotes/${id}/read`);
      if (!response.ok) throw new Error("فشل تحديث الطلب");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quotes"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast({ title: "تم التحديد كمقروء" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/quotes/${id}`);
      if (!response.ok) throw new Error("فشل حذف الطلب");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quotes"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast({ title: "تم حذف الطلب" });
    },
  });

  const unreadCount = quotes?.filter((q) => !q.isRead).length || 0;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="h-8 w-8" />
            طلبات عروض الأسعار
          </h1>
          <p className="text-gray-500 mt-1">
            إجمالي الطلبات: {quotes?.length || 0}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-lg px-4 py-2">
              {unreadCount} طلب جديد
            </Badge>
          )}
          <Button
            variant="outline"
            onClick={() => quotes && exportToCSV(
              quotes.map(q => ({
                ...q,
                isRead: q.isRead ? 'نعم' : 'لا',
                createdAt: new Date(q.createdAt).toLocaleDateString('ar-SA')
              })),
              'quotes',
              quotesHeaders
            )}
            disabled={!quotes || quotes.length === 0}
          >
            <Download className="ml-2 h-4 w-4" />
            تصدير Excel
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))
        ) : quotes?.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد طلبات بعد</p>
            </CardContent>
          </Card>
        ) : (
          quotes?.map((quote) => (
            <Card
              key={quote.id}
              className={`transition-all ${
                !quote.isRead ? "border-primary border-2 bg-primary/5" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{quote.name}</CardTitle>
                    {!quote.isRead && (
                      <Badge variant="destructive">جديد</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {formatDistanceToNow(new Date(quote.createdAt), {
                      addSuffix: true,
                      locale: ar,
                    })}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span dir="ltr">{quote.email}</span>
                  </div>
                  {quote.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span dir="ltr">{quote.phone}</span>
                    </div>
                  )}
                  {quote.company && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="h-4 w-4" />
                      <span>{quote.company}</span>
                    </div>
                  )}
                  {quote.country && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="h-4 w-4" />
                      <span>{quote.country}</span>
                    </div>
                  )}
                  {quote.product && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ShoppingBag className="h-4 w-4" />
                      <span>{quote.product}</span>
                    </div>
                  )}
                  {quote.quantity && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Package className="h-4 w-4" />
                      <span>{quote.quantity}</span>
                    </div>
                  )}
                </div>

                {quote.message && (
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{quote.message}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {!quote.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsReadMutation.mutate(quote.id)}
                      disabled={markAsReadMutation.isPending}
                    >
                      <Check className="ml-1 h-4 w-4" />
                      تحديد كمقروء
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="ml-1 h-4 w-4" />
                        حذف
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent dir="rtl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>حذف الطلب</AlertDialogTitle>
                        <AlertDialogDescription>
                          هل أنت متأكد من حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(quote.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          حذف
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
