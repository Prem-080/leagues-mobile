import React, { useRef } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';

type RoleCard = {
  key: string;
  title: string;
  description: string;
  image: any;
};

interface RoleSelectionViewProps {
  roles: RoleCard[];
  selectedRole: string | null;
  scaleAnims: {
    student: Animated.Value;
    hr: Animated.Value;
    faculty: Animated.Value;
  };
  onRoleSelect: (roleKey: string) => void;
  onContinue: () => void;
}

export default function RoleSelectionView({
  roles,
  selectedRole,
  scaleAnims,
  onRoleSelect,
  onContinue,
}: RoleSelectionViewProps) {
  return (
    <>
      <Text className="text-center text-3xl font-black text-slate">Register</Text>
      <Text className="mt-1 text-center text-2xl font-black text-[#F97316]">
        Choose Your Account
      </Text>
      <Text className="mt-3 px-2 text-center text-[13px] leading-5 text-slate">
        Select your role to access role-specific features and benefits.
      </Text>

      <View className="mt-5">
        {roles.map((role) => {
          const selected = selectedRole === role.key;

          return (
            <Animated.View
              key={role.key}
              style={{
                transform: [{ scale: scaleAnims[role.key as keyof typeof scaleAnims] }],
              }}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => onRoleSelect(role.key)}
                className={`mb-3 flex-row items-center rounded-2xl border p-3 ${selected ? 'border-[#F97316]' : 'border-overlay'} `}
              >
                <View className="mr-3 h-14 w-14 overflow-hidden rounded-full border border-overlay bg-light dark:bg-dark/50">
                  <Image source={role.image} className="h-full w-full" resizeMode="cover" />
                </View>

                <View className="flex-1">
                  <Text className="text-[16px] font-extrabold text-slate">{role.title}</Text>
                  <Text className="mt-0.5 text-[12px] leading-4 text-slate">
                    {role.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      {selectedRole && (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onContinue}
          className="mt-6 w-full rounded-xl bg-[#F97316] py-3 items-center"
        >
          <Text className="text-[16px] font-bold text-white">Continue</Text>
        </TouchableOpacity>
      )}
    </>
  );
}
