import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  return response;
}

export async function apiFormRequest(
  method: string,
  url: string,
  formData: FormData
): Promise<Response> {
  const options: RequestInit = {
    method,
    credentials: "include",
    body: formData,
  };

  const response = await fetch(url, options);
  return response;
}
