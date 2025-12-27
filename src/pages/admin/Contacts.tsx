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
import { Mail, Phone, Building, Clock, Check, Trash2, MessageSquare, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { exportToCSV, contactsHeaders } from "@/lib/exportToExcel";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminContacts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery<Contact[]>({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/contacts");
      if (!response.ok) throw new Error("فشل تحميل الرسائل");
      return response.json();
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("PATCH", `/api/admin/contacts/${id}/read`);
      if (!response.ok) throw new Error("فشل تحديث الرسالة");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast({ title: "تم التحديد كمقروءة" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/admin/contacts/${id}`);
      if (!response.ok) throw new Error("فشل حذف الرسالة");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contacts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast({ title: "تم حذف الرسالة" });
    },
  });

  const unreadCount = contacts?.filter((c) => !c.isRead).length || 0;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MessageSquare className="h-8 w-8" />
            رسائل التواصل
          </h1>
          <p className="text-gray-500 mt-1">
            إجمالي الرسائل: {contacts?.length || 0}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-lg px-4 py-2">
              {unreadCount} رسالة جديدة
            </Badge>
          )}
          <Button
            variant="outline"
            onClick={() => contacts && exportToCSV(
              contacts.map(c => ({
                ...c,
                isRead: c.isRead ? 'نعم' : 'لا',
                createdAt: new Date(c.createdAt).toLocaleDateString('ar-SA')
              })),
              'contacts',
              contactsHeaders
            )}
            disabled={!contacts || contacts.length === 0}
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
        ) : contacts?.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد رسائل بعد</p>
            </CardContent>
          </Card>
        ) : (
          contacts?.map((contact) => (
            <Card
              key={contact.id}
              className={`transition-all ${
                !contact.isRead ? "border-primary border-2 bg-primary/5" : ""
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    {!contact.isRead && (
                      <Badge variant="destructive">جديدة</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {formatDistanceToNow(new Date(contact.createdAt), {
                      addSuffix: true,
                      locale: ar,
                    })}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span dir="ltr">{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span dir="ltr">{contact.phone}</span>
                    </div>
                  )}
                  {contact.company && (
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span>{contact.company}</span>
                    </div>
                  )}
                </div>

                {contact.subject && (
                  <p className="font-medium mb-2">{contact.subject}</p>
                )}

                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                </div>

                <div className="flex gap-2">
                  {!contact.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsReadMutation.mutate(contact.id)}
                      disabled={markAsReadMutation.isPending}
                    >
                      <Check className="ml-1 h-4 w-4" />
                      تحديد كمقروءة
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
                        <AlertDialogTitle>حذف الرسالة</AlertDialogTitle>
                        <AlertDialogDescription>
                          هل أنت متأكد من حذف هذه الرسالة؟ لا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(contact.id)}
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
