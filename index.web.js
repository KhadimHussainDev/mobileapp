import { AppRegistry, Platform, StyleSheet, View } from 'react-native';
import App from './App';

// Define a container component to simulate mobile dimensions on web
const AppContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.phoneFrame}>
        <App />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  phoneFrame: {
    width: 375, // iPhone X width
    height: 812, // iPhone X height
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 10,
    borderColor: '#333',
    boxShadow: '0px 0px 20px rgba(0,0,0,0.3)',
  },
});

// Register the app for native platforms
AppRegistry.registerComponent('OttawaEventsApp', () => App);

// Register the web-specific entry point with the phone container
if (Platform.OS === 'web') {
  AppRegistry.registerComponent('OttawaEventsApp', () => AppContainer);
  AppRegistry.runApplication('OttawaEventsApp', {
    rootTag: document.getElementById('root')
  });
} 