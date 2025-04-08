declare module 'react-native-vector-icons/Ionicons' {
  import { ComponentClass } from 'react';
  import { TextProps } from 'react-native';

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  const Icon: ComponentClass<IconProps>;
  export default Icon;
}

declare module '@react-navigation/bottom-tabs' {
  export * from '@react-navigation/native';
  export function createBottomTabNavigator<T extends Record<string, object | undefined>>(): any;
} 