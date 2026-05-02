import { Stack } from "expo-router";
import { AuthProvider } from "@/src/features/auth/context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}