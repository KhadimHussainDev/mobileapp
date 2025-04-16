// This file contains polyfills for React Native components on web
import { Platform } from 'react-native';

// Polyfill StatusBar for web
if (Platform.OS === 'web') {
  // Mock the StatusBar functionality for web
  if (!window.StatusBar) {
    window.StatusBar = {
      setBarStyle: () => { },
      setBackgroundColor: () => { },
      setTranslucent: () => { },
      currentHeight: 0,
    };
  }
}

export default {}; 