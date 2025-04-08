import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";

// Import screens
import EventDetailsScreen from "../screens/EventDetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

import CustomHeader from "../components/CustomHeader";
import { useTheme } from "../themes/ThemeProvider";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
	const { t } = useTranslation("header");
	const { colors, themeColors } = useTheme();

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					contentStyle: {
						backgroundColor: themeColors.background,
					},
				}}
			>
				<Stack.Screen name="MainTabs" component={BottomTabNavigator} />
				<Stack.Screen
					name="EventDetails"
					component={EventDetailsScreen}
					options={{
						headerShown: true,
						header: ({ navigation, route, options }) => (
							<CustomHeader
								title={t("event")}
								showBackButton={true}
								onBackPress={() => navigation.goBack()}
							/>
						),
					}}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{
						headerShown: true,
						header: ({ navigation, route, options }) => (
							<CustomHeader
								title={t("login")}
								showBackButton={true}
								onBackPress={() => navigation.goBack()}
							/>
						),
					}}
				/>
				<Stack.Screen
					name="SignUp"
					component={SignUpScreen}
					options={{
						headerShown: true,
						header: ({ navigation, route, options }) => (
							<CustomHeader
								title={t("signup")}
								showBackButton={true}
								onBackPress={() => navigation.goBack()}
							/>
						),
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
