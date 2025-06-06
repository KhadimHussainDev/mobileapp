import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Route } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/Ionicons";

// Import screens
import CustomHeader from "../components/CustomHeader";
import Sidebar from "../components/Sidebar";
import ContactScreen from "../screens/ContactScreen";
import EventsScreen from "../screens/EventsScreen";
import HelpCenterScreen from "../screens/HelpCenterScreen";
import HomeScreen from "../screens/HomeScreen";
import { useTheme } from "../themes/ThemeProvider";
import { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

// Define types for the screenOptions parameters
interface TabBarIconProps {
	focused: boolean;
	color: string;
	size: number;
}

interface ScreenOptionsProps {
	route: Route<string, object | undefined>;
	navigation: any;
}

interface HeaderProps {
	navigation: any;
	route: Route<string, object | undefined>;
	options: {
		title?: string;
		[key: string]: any;
	};
}

export const BottomTabNavigator = () => {
	const { t } = useTranslation("header");
	const { colors } = useTheme();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const openSidebar = useCallback(() => {
		setIsSidebarOpen(true);
	}, []);

	const closeSidebar = useCallback(() => {
		setIsSidebarOpen(false);
	}, []);

	return (
		<>
			<Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

			<Tab.Navigator
				screenOptions={({ route }: ScreenOptionsProps) => ({
					tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
						let iconName = "";

						if (route.name === "Home") {
							iconName = focused ? "home" : "home-outline";
						} else if (route.name === "Events") {
							iconName = focused ? "calendar" : "calendar-outline";
						} else if (route.name === "HelpCenter") {
							iconName = focused ? "help-circle" : "help-circle-outline";
						} else if (route.name === "Contact") {
							iconName = focused ? "mail" : "mail-outline";
						}

						return <Icon name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: colors.customBlue,
					tabBarInactiveTintColor: colors.griclair,
					header: ({ navigation, route, options }: HeaderProps) => {
						return (
							<CustomHeader
								title={options.title || route.name}
								showBackButton={false}
								onMenuPress={openSidebar}
							/>
						);
					},
				})}
			>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						title: t("home"),
					}}
				/>
				<Tab.Screen
					name="Events"
					component={EventsScreen}
					options={{
						title: t("event"),
					}}
				/>
				<Tab.Screen
					name="HelpCenter"
					component={HelpCenterScreen}
					options={{
						title: t("assist"),
					}}
				/>
				<Tab.Screen
					name="Contact"
					component={ContactScreen}
					options={{
						title: t("contact"),
					}}
				/>
			</Tab.Navigator>
		</>
	);
};
