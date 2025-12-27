import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Package, Users, Eye, TrendingUp } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  totalArticles: number;
  publishedArticles: number;
  totalContacts: number;
  unreadContacts: number;
  totalQuotes: number;
  unreadQuotes: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/stats");
      if (!response.ok) throw new Error("فشل تحميل الإحصائيات");
      return response.json();
    },
  });

  const statCards = [
    {
      title: "إجمالي المقالات",
      value: stats?.totalArticles || 0,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "المقالات المنشورة",
      value: stats?.publishedArticles || 0,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "رسائل التواصل",
      value: stats?.totalContacts || 0,
      badge: stats?.unreadContacts,
      icon: MessageSquare,
      color: "bg-purple-500",
    },
    {
      title: "طلبات عروض الأسعار",
      value: stats?.totalQuotes || 0,
      badge: stats?.unreadQuotes,
      icon: Package,
      color: "bg-orange-500",
    },
    {
      title: "المستخدمين",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
        <p className="text-gray-500 mt-1">مرحباً بك في لوحة تحكم الفرسان الرباعية</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {isLoading
          ? Array(5)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-24" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
              ))
          : statCards.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    {stat.badge !== undefined && stat.badge > 0 && (
                      <span className="px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">
                        {stat.badge} جديد
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>آخر الرسائل</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">
              سيتم عرض آخر الرسائل هنا
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آخر طلبات الأسعار</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">
              سيتم عرض آخر الطلبات هنا
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
