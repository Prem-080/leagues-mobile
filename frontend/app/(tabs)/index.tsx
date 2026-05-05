import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/src/shared/constants/colors';
import { Link, router } from 'expo-router';
import Button from '@/src/shared/ui/Button';
import { useAuth } from '@/src/features/auth';
import { Redirect } from 'expo-router';
import "../../global.css";

type User = {
  token: string;
  loginUser: (token: string) => void;
  logout: () => void;
};

export default function HomeScreen() {
  const { token, logout } = useAuth();

  return (
    <View style={styles.container}>
      {!token ? (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>Welcome Guest</Text>
          <Button title="Login" onPress={() => router.push('/(auth)/login')} color={COLORS.textPrimary} fontSize={16} />
        </View>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>Welcome {token}</Text>
          <Text style={styles.subtitle}>You're logged in successfully.</Text>
          <Link href="/" onPress={logout} style={{ color: COLORS.textPrimary, marginTop: 10, fontSize: 20 }}>Logout</Link>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
});
