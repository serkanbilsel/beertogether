import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { tokens, ThemeMode, radius } from '../theme/tokens';

interface GlassSurfaceProps {
  children: React.ReactNode;
  theme?: ThemeMode;
  variant?: 'regular' | 'clear' | 'accent';
  style?: ViewStyle;
  borderRadius?: number;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  theme = 'dark',
  variant = 'regular',
  style,
  borderRadius = radius.full,
}) => {
  const t = tokens[theme];

  let bg = t.glassFallback;
  if (variant === 'clear') {
    bg = theme === 'dark' ? 'rgba(26, 23, 19, 0.72)' : 'rgba(255, 255, 255, 0.75)';
  } else if (variant === 'accent') {
    bg = t.accent;
  }

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: bg,
          borderRadius,
          borderColor: variant === 'accent' ? 'transparent' : t.separator,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
});
