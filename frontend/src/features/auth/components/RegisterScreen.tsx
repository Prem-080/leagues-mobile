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


export default function RegisterScreen() {
    const { theme, isDark, toggleTheme } = useTheme();
    //   const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
    
  return (
    <View>
      <Text>RegisterScreen</Text>
    </View>
  );
}

