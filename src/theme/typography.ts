import { TextStyle } from 'react-native';

export const fonts = {
  system: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
} as const;

export type FontWeight = keyof typeof fonts.system;

export const typography = {
  // Titres
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11181C',
  } as TextStyle,

  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  } as TextStyle,

  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
  } as TextStyle,

  h4: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11181C',
  } as TextStyle,

  // Texte du corps
  bodyLarge: {
    fontSize: 16,
    fontWeight: '500',
    color: '#11181C',
  } as TextStyle,

  body: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  } as TextStyle,

  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  } as TextStyle,

  // Labels
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  } as TextStyle,

  labelSmall: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666666',
  } as TextStyle,

  // Boutons
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  } as TextStyle,

  buttonSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  } as TextStyle,

  // Navigation
  navItem: {
    fontSize: 11,
    fontWeight: '500',
    color: '#8E8E93',
  } as TextStyle,

  navItemActive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF8C00',
  } as TextStyle,

  // Points et badges
  points: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  } as TextStyle,

  badge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  } as TextStyle,
} as const;

export type TypographyVariant = keyof typeof typography;
