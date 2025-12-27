import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, setup, isAuthenticated, isLoggingIn, isSettingUp, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { data: setupCheck, isLoading: isCheckingSetup } = useQuery({
    queryKey: ["setup-check"],
    queryFn: async () => {
      const response = await fetch("/api/admin/setup/check");
      return response.json();
    },
  });

  const isSetup = setupCheck?.isSetup ?? false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      navigate("/admin");
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const credentials = { email: data.email, password: data.password };
      if (isSetup) {
        await login(credentials);
        toast({
          title: "مرحباً بك",
          description: "تم تسجيل الدخول بنجاح",
        });
      } else {
        await setup(credentials);
        toast({
          title: "تم إعداد النظام",
          description: "تم إنشاء حساب الأدمن بنجاح",
        });
      }
      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء تسجيل الدخول",
        variant: "destructive",
      });
    }
  };

  if (isCheckingSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <img
              src="/assets/images/alfursan-logo.png"
              alt="الفرسان الرباعية"
              className="h-20 object-contain mx-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isSetup ? "تسجيل الدخول" : "إعداد النظام"}
          </CardTitle>
          <CardDescription>
            {isSetup
              ? "أدخل بياناتك للوصول إلى لوحة التحكم"
              : "قم بإنشاء حساب الأدمن الأول"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                dir="ltr"
                placeholder="admin@example.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoggingIn || isSettingUp}
            >
              {(isLoggingIn || isSettingUp) && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
              {isSetup ? "تسجيل الدخول" : "إنشاء الحساب"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
