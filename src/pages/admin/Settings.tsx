import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Loader2, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [notificationEmail, setNotificationEmail] = useState("");

  const { data: settings, isLoading } = useQuery<Record<string, string>>({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/settings");
      if (!response.ok) throw new Error("فشل تحميل الإعدادات");
      return response.json();
    },
  });

  useEffect(() => {
    if (settings?.notificationEmail) {
      setNotificationEmail(settings.notificationEmail);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async (data: { notificationEmail: string }) => {
      const response = await apiRequest("PUT", "/api/admin/settings", data);
      if (!response.ok) throw new Error("فشل حفظ الإعدادات");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast({ title: "تم حفظ الإعدادات" });
    },
    onError: () => {
      toast({ title: "خطأ", description: "فشل حفظ الإعدادات", variant: "destructive" });
    },
  });

  const handleSave = () => {
    saveMutation.mutate({ notificationEmail });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <SettingsIcon className="h-8 w-8" />
          الإعدادات
        </h1>
        <p className="text-gray-500 mt-1">إعدادات النظام والإشعارات</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              إعدادات الإشعارات
            </CardTitle>
            <CardDescription>
              إعداد البريد الإلكتروني لاستقبال إشعارات رسائل التواصل وطلبات الأسعار
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notificationEmail">البريد الإلكتروني للإشعارات</Label>
              <Input
                id="notificationEmail"
                type="email"
                dir="ltr"
                placeholder="admin@example.com"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                سيتم إرسال إشعارات لهذا البريد عند وصول رسائل أو طلبات جديدة
              </p>
            </div>
            <Button onClick={handleSave} disabled={saveMutation.isPending}>
              {saveMutation.isPending && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
              حفظ الإعدادات
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
