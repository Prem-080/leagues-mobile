import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  View,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { SPACING } from '@/src/shared/constants/spacing';
import { FloatingBackground, GridOverlay, ThemeToggle } from '@/src/shared/components/index';
import RoleSelectionView from './RoleSelectionView';
import RegistrationFormView from './RegistrationFormView';
import ConfirmRoleModal from './ConfirmRoleModal';

type RoleCard = {
  key: string;
  title: string;
  description: string;
  image: any;
};

const ROLES: RoleCard[] = [
  {
    key: 'student',
    title: 'Candidate/Student',
    description: 'Explore leagues, apply for jobs, and competitions for your future.',
    image: require('../../../../assets/register/student-6fgEoikA.png'),
  },
  {
    key: 'hr',
    title: 'Corporate/HR',
    description: 'Speed Up your hiring with AI tools, ATS and more.',
    image: require('../../../../assets/register/hr-CiUr_LL5.png'),
  },
  {
    key: 'faculty',
    title: 'Campus/Faculty',
    description: 'Organise Competitions, Manage Placements and more.',
    image: require('../../../../assets/register/faculty-B-HjmlXb.png'),
  },
];

export default function RegisterScreen() {
  const { colorScheme } = useColorScheme();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Form fields state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form transition animation
  const formOpacity = useRef(new Animated.Value(0)).current;
  const roleOpacity = useRef(new Animated.Value(1)).current;

  // Animated scale values for each role card
  const scaleAnims = useRef({
    student: new Animated.Value(1),
    hr: new Animated.Value(1),
    faculty: new Animated.Value(1),
  }).current;

  const handleRoleSelect = (roleKey: string) => {
    setSelectedRole(roleKey);
    
    // Animate the selected card with a scale effect
    Animated.spring(scaleAnims[roleKey as keyof typeof scaleAnims], {
      toValue: 1.03,
      useNativeDriver: true,
      bounciness: 8,
    }).start();

    // Reset other cards to normal scale
    Object.entries(scaleAnims).forEach(([key, anim]) => {
      if (key !== roleKey) {
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 8,
        }).start();
      }
    });
  };

  const handleContinueClick = () => {
    // Show confirmation modal for hr and faculty roles
    if (selectedRole === 'hr' || selectedRole === 'faculty') {
      setShowConfirmModal(true);
    } else {
      // Proceed directly for student
      handleProceedToForm();
    }
  };

  const handleProceedToForm = () => {
    setShowConfirmModal(false);
    
    // Animate to form
    Animated.parallel([
      Animated.timing(roleOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowForm(true);
    });
  };

  const handleBackToRoles = () => {
    // Animate back to role selection
    Animated.parallel([
      Animated.timing(formOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(roleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirmPassword(false);
      
      // Reset animations
      Object.values(scaleAnims).forEach((anim) => {
        Animated.spring(anim, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 8,
        }).start();
      });
      
      setShowForm(false);
      setSelectedRole(null);
    });
  };

  const cardShadow = useMemo(
    () => ({
      shadowColor: '#000',
      shadowOpacity: 0.22,
      shadowRadius: 22,
      shadowOffset: { width: 0, height: 12 },
      elevation: 12,
    }),
    []
  );

  const handleNext = () => {
    console.log(`Registering ${selectedRole}:`, {
      fullName,
      email,
      phone,
      password,
    });
  };

  return (
    <View className="flex-1">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <LinearGradient
        colors={colorScheme === 'dark' ? ['#020617', '#0f172a'] : ['#0b1f3a', '#1e3a5f']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View className="flex-1">
          <GridOverlay />
          <FloatingBackground />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Main Content */}
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              paddingHorizontal: SPACING.lg,
              paddingVertical: SPACING.xxxl,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View
              className="relative self-center w-full max-w-[380px] rounded-[28px] border px-5 pt-5 pb-6 bg-light dark:bg-dark border-overlay"
              style={cardShadow}
            >
              {/* Back/Close Buttons */}
              {showForm ? (
                  <TouchableOpacity
                    onPress={handleBackToRoles}
                    className="absolute left-4 top-4 z-30 h-10 w-10 items-center justify-center rounded-md bg-orange-500"
                    hitSlop={10}
                  >
                    <Ionicons name="arrow-back" size={18} color="#e5e7eb" />
                  </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                onPress={() => router.back()}
                className="absolute right-4 top-4 z-30 h-10 w-10 items-center justify-center rounded-md bg-orange-500"
                hitSlop={10}
              >
                <Ionicons name="close" size={18} color="#e5e7eb" />
              </TouchableOpacity>

              {/* Content - Role Selection or Form */}
              {!showForm ? (
                <Animated.View style={{ opacity: roleOpacity, pointerEvents: showForm ? 'none' : 'auto' }}>
                  <RoleSelectionView
                    roles={ROLES}
                    selectedRole={selectedRole}
                    scaleAnims={scaleAnims}
                    onRoleSelect={handleRoleSelect}
                    onContinue={handleContinueClick}
                  />
                </Animated.View>
              ) : (
                <Animated.View style={{ opacity: formOpacity, pointerEvents: !showForm ? 'none' : 'auto' }}>
                  <RegistrationFormView
                    roleKey={selectedRole}
                    fullName={fullName}
                    email={email}
                    phone={phone}
                    password={password}
                    confirmPassword={confirmPassword}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    onFullNameChange={setFullName}
                    onEmailChange={setEmail}
                    onPhoneChange={setPhone}
                    onPasswordChange={setPassword}
                    onConfirmPasswordChange={setConfirmPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    onNext={handleNext}
                  />
                </Animated.View>
              )}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>

      {/* Confirmation Modal */}
      <ConfirmRoleModal
        visible={showConfirmModal}
        roleKey={selectedRole}
        onConfirm={handleProceedToForm}
        onCancel={() => setShowConfirmModal(false)}
      />
    </View>
  );
}