import React from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface RegistrationFormViewProps {
  roleKey: string | null;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onFullNameChange: (text: string) => void;
  onEmailChange: (text: string) => void;
  onPhoneChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onNext: () => void;
}

const roleLabels: Record<string, string> = {
  student: 'Student',
  hr: 'Hr',
  faculty: 'Faculty',
};

export default function RegistrationFormView({
  roleKey,
  fullName,
  email,
  phone,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onNext,
}: RegistrationFormViewProps) {
  const roleLabel = roleKey ? roleLabels[roleKey] : 'User';

  return (
    <>
      <View className="mb-2 flex-row items-center justify-center">
        <MaterialCommunityIcons name="rocket" size={24} color="#F97316" />
        <Text className="ml-2 text-center text-3xl font-black text-slate">Create Your</Text>
      </View>
      <Text className="text-center text-3xl font-black text-slate">Account</Text>
      <Text className="mt-1 text-center text-sm font-medium text-slate/70">
        Register as <Text className="text-[#F97316]">{roleLabel}</Text>
      </Text>

      <View className="mt-4 rounded-lg border border-[#F97316]/40 bg-[#F97316]/10 px-3 py-2">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="lightbulb-on" size={16} color="#F97316" />
          <Text className="ml-2 text-[12px] text-[#F97316]">
            Use working email id for verification in next step!
          </Text>
        </View>
      </View>

      {/* Full Name */}
      <TextInput
        placeholder="Enter your Full Name"
        placeholderTextColor="#9ca3af"
        value={fullName}
        onChangeText={onFullNameChange}
        className="mt-4 rounded-lg border border-overlay bg-light dark:bg-dark px-4 py-3 text-slate"
      />

      {/* Email */}
      <TextInput
        placeholder="Enter your Official Email ID"
        placeholderTextColor="#9ca3af"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        className="mt-4 rounded-lg border border-overlay bg-light dark:bg-dark px-4 py-3 text-slate"
      />

      {/* Phone */}
      <View className="mt-4 flex-row items-center rounded-lg border border-overlay bg-light dark:bg-dark">
        <View className="px-3 py-3">
          <Text className="font-medium text-slate">
            <MaterialCommunityIcons name="flag-variant" size={16} color="#9ca3af" />
            {' +91'}
          </Text>
        </View>
        <TextInput
          placeholder="Phone number"
          placeholderTextColor="#9ca3af"
          value={phone}
          onChangeText={onPhoneChange}
          keyboardType="phone-pad"
          className="flex-1 text-slate"
        />
      </View>

      {/* Password */}
      <View className="mt-4 flex-row items-center rounded-lg border border-overlay bg-light dark:bg-dark pr-3">
        <TextInput
          placeholder="Create your password"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry={!showPassword}
          className="flex-1 px-4 py-3 text-slate"
        />
        <Pressable onPress={onTogglePassword}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={18}
            color="#9ca3af"
          />
        </Pressable>
      </View>

      {/* Confirm Password */}
      <View className="mt-4 flex-row items-center rounded-lg border border-overlay bg-light dark:bg-dark pr-3">
        <TextInput
          placeholder="Confirm your Password"
          placeholderTextColor="#9ca3af"
          value={confirmPassword}
          onChangeText={onConfirmPasswordChange}
          secureTextEntry={!showConfirmPassword}
          className="flex-1 px-4 py-3 text-slate"
        />
        <Pressable onPress={onToggleConfirmPassword}>
          <Ionicons
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={18}
            color="#9ca3af"
          />
        </Pressable>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onNext}
        className="mt-6 w-full rounded-lg bg-[#F97316] py-3 items-center"
      >
        <Text className="text-[16px] font-bold text-white">Next</Text>
      </TouchableOpacity>

      {/* Sign In Link */}
      <View className="mt-4 flex-row items-center justify-center">
        <Text className="text-slate/70 text-[14px]">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text className="font-bold text-[14px] text-[#F97316]">Sign in</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
