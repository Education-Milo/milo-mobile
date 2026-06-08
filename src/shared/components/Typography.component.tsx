import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { typography, type TypographyVariant } from '../theme/typography';

interface TypographyProps extends Omit<TextProps, 'style'> {
  variant?: TypographyVariant;
  style?: TextProps['style'];
  color?: string;
}

const TypographyComponent = (props: TypographyProps) => {
  const { variant = 'body', style, color, children, ...rest } = props;
  const textStyle = [
    typography[variant],
    color && { color },
    ...(Array.isArray(style) ? style : [style]),
  ].filter(Boolean);

  return (
    <Text style={textStyle} {...rest}>
      {children}
    </Text>
  );
};

export default TypographyComponent;