import { ColorValue } from 'react-native';

export const theme = {
  colors: {
    primary: '#1E5FD8',
    secondary: '#2C73E0',
    dark: '#0F3FA8',

    white: '#FFFFFF',
    gold: '#D4AF37',

    grayLight: '#D9D9D9',
    gray: '#BFBFBF',
  },

  // Tipagem correta para gradient
 gradient: ['#0F3FA8', '#1E5FD8', '#2C73E0'] as const,

  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },

  radius: {
    md: 16,
    lg: 24,
  },

  typography: {
    title: {
      fontSize: 28,
      fontWeight: '800' as const,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600' as const,
    },
    text: {
      fontSize: 14,
    },
  },
} as const;