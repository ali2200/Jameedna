import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface User {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isAdmin: boolean;
}

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/auth/user");
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data.user;
    },
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", { email, password });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل تسجيل الدخول");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-user"], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/auth/logout");
      if (!response.ok) {
        throw new Error("فشل تسجيل الخروج");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
      queryClient.invalidateQueries();
    },
  });

  const setupMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await apiRequest("POST", "/api/admin/setup", { email, password });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "فشل إعداد النظام");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth-user"], data.user);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    setup: setupMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isSettingUp: setupMutation.isPending,
    loginError: loginMutation.error,
  };
}
