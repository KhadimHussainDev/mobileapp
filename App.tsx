import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./src/i18n/i18n";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { ThemeProvider } from "./src/themes/ThemeProvider";

// Ignore specific warnings
LogBox.ignoreLogs([
	"ViewPropTypes will be removed",
	"ColorPropType will be removed",
	"Failed prop type",
	"react-native-gesture-handler",
	"TurboModuleRegistry",
	"AsyncStorage has been extracted from react-native",
	// Add any other warnings you want to ignore
]);

const App = () => {
	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<StatusBar style="auto" />
				<AppNavigator />
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export default App;
