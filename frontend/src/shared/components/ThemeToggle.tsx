import React, { useEffect, useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = 'absolute top-12 right-10 z-20' }: ThemeToggleProps) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const toggleAnim = useRef(new Animated.Value(colorScheme === 'dark' ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(toggleAnim, {
      toValue: colorScheme === 'dark' ? 1 : 0,
      useNativeDriver: false,
      bounciness: 6,
    }).start();
  }, [colorScheme, toggleAnim]);

  const translateX = toggleAnim.interpolate({
    inputRange: [-0.1, 1],
    outputRange: [3, 33],
  });

  const trackColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#73C0FC', '#193254'],
  });

  const handleToggle = () => {
    const next = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(next);
  };

  return (
    <Pressable onPress={handleToggle} className={className}>
      <Animated.View
        className="w-16 justify-center rounded-2xl h-8"
        style={{ backgroundColor: trackColor }}
      >
        <Animated.View className="absolute top-1.5 left-1.5" style={{ opacity: toggleAnim }}>
          <Ionicons name="moon" size={16} color="rgb(115, 192, 252)" />
        </Animated.View>

        <Animated.View
          className="absolute top-1.5 right-1.5"
          style={{ opacity: Animated.subtract(1, toggleAnim) }}
        >
          <Ionicons name="sunny" size={16} color="#ffd43b" />
        </Animated.View>

        <Animated.View
          className="absolute top-1.5 w-5 h-5 rounded-full bg-white shadow"
          style={{ transform: [{ translateX }] }}
        />
      </Animated.View>
    </Pressable>
  );
}
