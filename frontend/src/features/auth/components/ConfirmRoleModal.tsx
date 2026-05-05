import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ConfirmRoleModalProps {
  visible: boolean;
  roleKey: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const roleContent: Record<string, { icon: string; title: string; description: string; warning: string }> = {
  hr: {
    icon: 'briefcase',
    title: 'Corporate/HR Account',
    description: 'Are you an HR professional or recruiter looking to hire candidates and use AI hiring tools?',
    warning: 'If you\'re a student looking for jobs, internships, or competitions, please select "Candidate/Student" instead.',
  },
  faculty: {
    icon: 'school',
    title: 'Campus/Faculty Account',
    description: 'Are you a faculty member or campus administrator looking to organize competitions and manage placements?',
    warning: 'If you\'re a student looking for jobs, internships, or competitions, please select "Candidate/Student" instead.',
  },
};

export default function ConfirmRoleModal({
  visible,
  roleKey,
  onConfirm,
  onCancel,
}: ConfirmRoleModalProps) {
  const content = roleKey && roleContent[roleKey];

  if (!content) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-[90%] max-w-xs rounded-2xl bg-light dark:bg-dark border border-overlay px-5 py-6">
          {/* Header Icon */}
          <View className="mb-4 flex-row items-center justify-center">
            <MaterialCommunityIcons name={content.icon} size={32} color="#F97316" />
          </View>

          {/* Title */}
          <Text className="text-center text-xl font-extrabold text-slate">
            {content.title}
          </Text>

          {/* Description */}
          <Text className="mt-3 text-center text-[14px] leading-5 text-slate/70">
            {content.description}
          </Text>

          {/* Warning Banner */}
          <View className="mt-4 flex-row rounded-lg border border-blue-400/40 bg-blue-400/10 p-3">
            <MaterialCommunityIcons name="alert" size={16} color="#93c5fd" style={{ marginTop: 2 }} />
            <Text className="ml-2 flex-1 text-[12px] leading-4 text-blue-200">
              {content.warning}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="mt-6 flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onCancel}
              className="flex-1 items-center rounded-lg border border-overlay bg-light dark:bg-dark/50 py-2.5"
            >
              <Text className="text-[14px] font-bold text-slate">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onConfirm}
              className="flex-1 items-center rounded-lg bg-[#F97316] py-2.5"
            >
              <Text className="text-[14px] font-bold text-white">Yes, Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
