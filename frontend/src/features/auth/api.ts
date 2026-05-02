import { apiClient } from "@/src/shared/utils/apiClient";

export const login = async (email: string, password: string) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};