import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type IconType = {
  name: string;
  family: 'ionicons' | 'material';
  size: number;
  color: string;
  x: number;
  y: number;
};

const ICONS_DATA = (w: number, h: number): IconType[] => [
  // Top Left Cluster (Yellow Caps)
  { name: 'school', family: 'ionicons', size: 34, color: '#FACC15', x: w * 0.08, y: h * 0.1 },
  { name: 'school', family: 'ionicons', size: 24, color: '#FACC15', x: w * 0.25, y: h * 0.08 },
  { name: 'school', family: 'ionicons', size: 36, color: '#FACC15', x: w * 0.1,  y: h * 0.35 },
  { name: 'school', family: 'ionicons', size: 18, color: '#FACC15', x: w * 0.03, y: h * 0.48 },
  // Top Right Cluster (Blue Briefcases)
  { name: 'briefcase', family: 'material', size: 30, color: '#60A5FA', x: w * 0.72, y: h * 0.09 },
  { name: 'briefcase', family: 'material', size: 26, color: '#60A5FA', x: w * 0.88, y: h * 0.13 },
  // Right Side (Green Book)
  { name: 'book-open-variant', family: 'material', size: 32, color: '#34D399', x: w * 0.82, y: h * 0.38 },
  // Mid-Far Right
  { name: 'briefcase', family: 'material', size: 22, color: '#60A5FA', x: w * 0.95, y: h * 0.55 },
  // Mid-Far Left
  { name: 'briefcase', family: 'material', size: 26, color: '#60A5FA', x: w * 0.12, y: h * 0.62 },
  // Bottom Right (Lightbulbs)
  { name: 'lightbulb-on', family: 'material', size: 32, color: '#F472B6', x: w * 0.82, y: h * 0.72 },
  { name: 'lightbulb-on', family: 'material', size: 24, color: '#F472B6', x: w * 0.7,  y: h * 0.88 },
  // Bottom Left (Green Books)
  { name: 'notebook',      family: 'material', size: 30, color: '#34D399', x: w * 0.08, y: h * 0.91 },
  { name: 'book-outline',  family: 'material', size: 26, color: '#34D399', x: w * 0.26, y: h * 0.93 },
];

function FloatingItem({ icon, duration }: { icon: IconType; duration: number }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => anim.stopAnimation();
  }, []);

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const Icon = icon.family === 'ionicons' ? Ionicons : MaterialCommunityIcons;

  return (
    <Animated.View
      style={[
        styles.iconWrapper,
        {
          top: icon.y,
          left: icon.x,
          opacity: 0.15,
          transform: [{ scale }],
        },
      ]}
    >
      <Icon name={icon.name as any} size={icon.size} color={icon.color} />
    </Animated.View>
  );
}
const DURATIONS = Array.from({ length: 13 }, (_, i) => 7000 + (i * 317) % 2000);

export default function FloatingBackground() {
  const { width: w, height: h } = useWindowDimensions();
  const icons = useMemo(() => ICONS_DATA(w, h), [w, h]);

  return (
    <View style={styles.container} pointerEvents="none">
      {icons.map((icon, index) => (
        <FloatingItem key={index} icon={icon} duration={DURATIONS[index]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  iconWrapper: {
    position: 'absolute',
  },
});