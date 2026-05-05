import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context';
import { login } from '../api';
import { SPACING } from '@/src/shared/constants/spacing';
import { FloatingBackground, GridOverlay, ThemeToggle } from '@/src/shared/components';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import GoogleButton from './GoogleButton';


export default function LoginScreen() {
  const { colorScheme } = useColorScheme();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      <View className="flex-1">
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

        <LinearGradient
          colors={
            colorScheme === "dark"
              ? ['#020617', '#0f172a']   // darker for dark mode
              : ['#0b1f3a', '#1e3a5f']   // lighter for light mode
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            <GridOverlay />
            <FloatingBackground />

             {/* ── Theme Toggle ── */}
            <ThemeToggle />

            {/* ── Keyboard + Scroll ── */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: SPACING.lg,
                  paddingVertical: SPACING.xxxl,
                }}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* ═══ Card ═══ */}
                <View
                  className="relative z-10 rounded-2xl border px-6 pt-12 pb-8 bg-light dark:bg-dark border-overlay w-full max-w-[350px]"
                  style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.15,
                    shadowRadius: 20,
                    shadowOffset: { width: 0, height: 10 },
                    elevation: 10,
                  }}
                >
                  <TouchableOpacity onPress={() => router.push('/(tabs)')} className="absolute top-4 right-4 z-30 w-10 h-10 items-center justify-center bg-orange-500 rounded-md" hitSlop={10}>
                    <Ionicons name="close" size={18} color={'#e5e7eb'} />
                  </TouchableOpacity>

                  <Text 
                    className="text-2xl font-black text-center mb-2 text-slate"
                    style={{ letterSpacing: 0.2 }}
                  >
                    Sign In to Continue
                  </Text>
                  <Text 
                    className="text-sm text-center mb-6 text-grey"
                    style={{ lineHeight: 18 }}
                  >
                    Welcome back! Choose how you&apos;d like to sign in
                  </Text>

                  {/* Google */}
                  <TouchableOpacity 
                    activeOpacity={0.8} 
                    className="flex-row items-center rounded-lg border mb-8 bg-light dark:bg-dark/50 border-overlay dark:border-overlay"
                    onPress={handleGoogleLogin}
                  >
                    <GoogleButton />
                  </TouchableOpacity>

                  {/* Divider */}
                  <View className="flex-row items-center mb-4">
                    <View className="flex-1 h-px border-t border-overlay dark:border-overlay" />
                    <Text 
                      className="text-xs mx-3 text-grey"
                    >
                      Or Continue With
                    </Text>
                    <View className="flex-1 h-px border-t border-overlay dark:border-overlay" />
                  </View>

                  {/* Email */}
                  <View 
                    className="flex-row items-center rounded-lg border mb-3 px-4 h-[50px] bg-light dark:bg-dark/50 border-overlay dark:border-overlay"
                  >
                    <TextInput
                      className="flex-1 text-sm text-slate dark:text-light"
                      placeholder="Email"
                      placeholderTextColor={colorScheme === 'dark' ? '#6B7280' : '#9ca3af'}
                      value={email}
                      onChangeText={(val) => setEmail(val)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <MaterialIcons name="email" size={20} color={colorScheme === 'dark' ? '#6B7280' : '#9ca3af'} />
                  </View>

                  {/* Password */}
                  <View 
                    className="flex-row items-center rounded-lg border mb-3 px-4 h-[50px] bg-light dark:bg-dark/50 border-overlay dark:border-overlay"
                  >
                    <TextInput
                      className="flex-1 text-sm text-slate dark:text-light"
                      placeholder="Password"
                      placeholderTextColor={colorScheme === 'dark' ? '#6B7280' : '#9ca3af'}
                      value={password}
                      onChangeText={(val) => setPassword(val)}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(v => !v)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={20}
                        color={colorScheme === 'dark' ? '#6B7280' : '#9ca3af'}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Forgot */}
                  <TouchableOpacity className="flex-row items-center justify-end mt-1 mb-6" activeOpacity={0.7}>
                    <MaterialIcons name="lock" size={13} color="#F97316" />
                    <Text 
                      className="text-sm font-medium ml-1 text-accent"
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  {/* Login btn */}
                  <TouchableOpacity
                    className="rounded-full h-[50px] items-center justify-center mb-3 bg-accent"
                    style={[
                      isLoading && { opacity: 0.6 }
                    ]}
                    onPress={handleLogin}
                    activeOpacity={0.85}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? <ActivityIndicator color="#ffffff" />
                      : <Text 
                          className="text-base font-bold text-white"
                        >
                          Login
                        </Text>
                    }
                  </TouchableOpacity>

                  {/* Sign Up */}
                  <TouchableOpacity activeOpacity={0.3} 
                        onPress={() => router.push('/(auth)/register')} className="rounded-full h-[50px] items-center justify-center border border-overlay dark:border-overlay">
                    <Text className="text-sm font-medium text-slate">
                      Don&apos;t have an Account{' '}
                      <Text 
                        className="font-bold text-accent"
                      >
                        Sign Up
                      </Text>
                    </Text>
                  </TouchableOpacity>

                </View>
              </ScrollView>
            </KeyboardAvoidingView>

          </View>
        </LinearGradient>
      </View>
    </>
  );
}