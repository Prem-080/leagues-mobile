import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, Pattern, Rect, Line } from 'react-native-svg';

export function GridOverlay() {
  return (
    <Svg style={StyleSheet.absoluteFillObject} width="100%" height="100%" pointerEvents="none">
      <Defs>
        <Pattern id="grid" width={44} height={44} patternUnits="userSpaceOnUse">
          <Line x1="44" y1="0" x2="44" y2="44" stroke="rgba(100,160,255,0.08)" strokeWidth={1} />
          <Line x1="0" y1="44" x2="44" y2="44" stroke="rgba(100,160,255,0.08)" strokeWidth={1} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grid)" />
    </Svg>
  );
}