import { type ViewProps } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  useFonts({
    'Bricolage-Grotesque': require('../assets/fonts/BricolageGrotesque.ttf')
  });

  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
