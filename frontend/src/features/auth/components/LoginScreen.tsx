import React, { useRef, useState, useMemo } from 'react';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context';
import { login } from '../api';
import { SPACING, RADIUS } from '@/src/shared/constants/spacing';
import { FloatingBackground, GridOverlay } from '@/src/shared/components/index';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/src/shared/context/ThemeContext';
import { Theme } from '@/src/shared/constants/theme';
import GoogleButton from './GoogleButton';


export default function LoginScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();

  /* ── Toggle animation ── */
  const toggleAnim = useRef(
    new Animated.Value(isDark ? 1 : 0)
  ).current;

  const handleToggle = () => {
    const next = !isDark;

    Animated.spring(toggleAnim, {
      toValue: next ? 1 : 0,
      useNativeDriver: false,
      bounciness: 6,
    }).start();

    toggleTheme();
  };

  // Thumb movement
  const translateX = toggleAnim.interpolate({
    inputRange: [-0.1, 1],
    outputRange: [3, 42], // left → right
  });

  // Track color
  const trackColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#73C0FC', '#193254'],
  });


  /* ── Login ── */
  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    try {
      const res = await login(email, password);
      loginUser(res.token);
    } catch (e) {
      console.error('Login failed:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => { };

  return (
    <>
      <View style={styles.container}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        {/* ✅ FIX 1: LinearGradient gets flex:1 via style prop */}
        <LinearGradient
          colors={['#0b1f3a', '#1e3a5f']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inner}
        >
          {/* ✅ FIX 2: One root View so absolute children (toggle, icons) position correctly */}
          <View style={styles.inner}>
            <GridOverlay />
            <FloatingBackground />

            {/* ── Theme Toggle ── */}
            <Pressable onPress={handleToggle} style={{ ...styles.themeToggle }}>
              <Animated.View style={[styles.track, { backgroundColor: trackColor }]}>

                {/* 🌙 LEFT */}
                <Animated.View style={[styles.iconLeft]}>
                  <Ionicons name="moon" size={16} color="rgb(115, 192, 252)" />
                </Animated.View>

                {/* ☀️ RIGHT */}
                <Animated.View style={[styles.iconRight]}>
                  <Ionicons name="sunny" size={16} color="#ffd43b" />
                </Animated.View>

                {/* ⚪ THUMB */}
                <Animated.View
                  style={[
                    styles.thumb,
                    { transform: [{ translateX }] },
                  ]}
                />

              </Animated.View>
            </Pressable>

            {/* ── Keyboard + Scroll ── */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoid}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* ═══ Card ═══ */}
                <View style={styles.card}>

                  <Link href="/(tabs)" style={styles.closeBtn}>
                    <Ionicons name="close" size={18} color={theme.textMuted} />
                  </Link>

                  <Text style={styles.title}>Sign In to Continue</Text>
                  <Text style={styles.subtitle}>
                    Welcome back! Choose how you'd like to sign in
                  </Text>

                  {/* Google */}
                  <TouchableOpacity activeOpacity={0.8} style={styles.googleRow} onPress={handleGoogleLogin}>
                    <GoogleButton/>
                  </TouchableOpacity>

                  {/* Divider */}
                  <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Or Continue With</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Email */}
                  <View style={styles.inputWrap}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor={theme.textMuted}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <MaterialIcons name="email" size={20} color={theme.textMuted} />
                  </View>

                  {/* Password */}
                  <View style={styles.inputWrap}>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor={theme.textMuted}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(v => !v)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color={theme.textMuted}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Forgot */}
                  <TouchableOpacity style={styles.forgotRow} activeOpacity={0.7}>
                    <MaterialIcons name="lock" size={13} color={theme.accent} />
                    <Text style={styles.forgotText}> Forgot Password?</Text>
                  </TouchableOpacity>

                  {/* Login btn */}
                  <TouchableOpacity
                    style={[styles.loginBtn, isLoading && { opacity: 0.6 }]}
                    onPress={handleLogin}
                    activeOpacity={0.85}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? <ActivityIndicator color={theme.white} />
                      : <Text style={styles.loginBtnText}>Login</Text>}
                  </TouchableOpacity>

                  {/* Sign Up */}
                  <Pressable style={styles.signUpBtn}>
                    <Text style={styles.signUpText}>
                      Don't have an Account{' '}
                      <Text style={styles.signUpHighlight} onPress={() => router.push('/(auth)/register')} >Sign Up</Text>
                    </Text>
                  </Pressable>

                </View>
              </ScrollView>
            </KeyboardAvoidingView>

          </View>
        </LinearGradient>
      </View>
    </>
  );
}

/* ─────────── Styles ─────────── */
const createStyles = (theme: Theme, isDark: boolean) => StyleSheet.create({

  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  keyboardAvoid: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xxxl,
  },

  /* ── Toggle ── */
  themeToggle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 34,
    right: 18,
    zIndex: 20,
  },

  track: {
    width: 70,
    height: 30,
    borderRadius: 18,
    justifyContent: 'center',
  },

  thumb: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 15,
    backgroundColor: '#fff',
    top: 4,

    elevation: 6,
  },

  iconLeft: {
    position: 'absolute',
    left: 10,
    top: 6,
  },

  iconRight: {
    position: 'absolute',
    right: 10,
    top: 6,
  },
  /* ── Card ── */
  card: {
    backgroundColor: theme.cardTransparent,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: theme.cardBorder,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xxl,
    zIndex: 5,
  },
  closeBtn: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: theme.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    color: theme.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 18,
  },

  /* ── Google ── */
  googleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.inputBackground,
    borderRadius: RADIUS.md,
    borderColor: theme.inputBorder,
    marginBottom: SPACING.xxl,
    borderWidth: 1
  },
  googleIconBox: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: '#ffffff',   // always white so G logo pops
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: {
    color: theme.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },

  /* ── Divider ── */
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: theme.divider },
  dividerText: {
    color: theme.textMuted,
    fontSize: 12,
    marginHorizontal: SPACING.md,
  },

  /* ── Inputs ── */
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.inputBackground,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: theme.inputBorder,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    height: 50,
  },
  input: {
    flex: 1,
    color: theme.textPrimary,
    fontSize: 14,
    paddingVertical: 0,
  },

  /* ── Forgot ── */
  forgotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
    marginBottom: SPACING.xl,
  },
  forgotText: { color: theme.accent, fontSize: 13, fontWeight: '500' },

  /* ── Login ── */
  loginBtn: {
    backgroundColor: theme.accent,
    borderRadius: RADIUS.full,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  loginBtnText: { color: theme.white, fontSize: 16, fontWeight: '700' },

  /* ── Sign Up ── */
  signUpBtn: {
    borderRadius: RADIUS.full,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.divider,
  },
  signUpText: { color: theme.textPrimary, fontSize: 14, fontWeight: '500' },
  signUpHighlight: { color: theme.accent, fontWeight: '700' },
});