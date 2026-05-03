import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '@/src/features/auth';
import { ThemeProvider } from '@/src/shared/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </AuthProvider>
    </ThemeProvider>
  );
}