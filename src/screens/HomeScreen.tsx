import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import EventCarousel from "../components/EventCarousel";
import { events, organizers } from "../constants/mockData";
import { MainTabParamList, RootStackParamList } from "../navigation/types";
import { useTheme } from "../themes/ThemeProvider";
import ScreenWrapper from "./ScreenWrapper";

type HomeScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<MainTabParamList, "Home">,
	NativeStackNavigationProp<RootStackParamList>
>;

const HomeScreen = () => {
	const { t } = useTranslation("doc");
	const navigation = useNavigation<HomeScreenNavigationProp>();
	const { colors, themeColors, toggleTheme, theme } = useTheme();

	const navigateToEventDetails = (id: string) => {
		navigation.navigate("EventDetails", { id });
	};

	const navigateToEvents = () => {
		navigation.navigate("Events");
	};

	return (
		<ScreenWrapper>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: themeColors.background }}
			>
				<ScrollView style={styles.container}>
					{/* Hero Section */}
					<View style={styles.heroSection}>
						<Text style={[styles.heroTitle, { color: colors.grandTitre }]}>
							{t("events")}
						</Text>
						<Text style={[styles.heroSubtitle, { color: themeColors.text }]}>
							{t("searchText")}
						</Text>
						<CustomButton
							title={t("viewAll")}
							onPress={navigateToEvents}
							style={styles.viewAllButton}
						/>
					</View>

					{/* Popular Events */}
					<EventCarousel
						title={t("popularEvents")}
						events={events}
						onEventPress={navigateToEventDetails}
						viewAllPress={navigateToEvents}
					/>

					{/* Call to Action */}
					<View
						style={[
							styles.ctaContainer,
							{ backgroundColor: colors.customBlue },
						]}
					>
						<Text style={styles.ctaText}>{t("callToAction")}</Text>
						<CustomButton
							title={t("viewAll")}
							onPress={navigateToEvents}
							variant="secondary"
							style={styles.ctaButton}
						/>
					</View>

					{/* Things to Do */}
					<View style={styles.sectionContainer}>
						<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
							{t("thingsToDo")}
						</Text>
						<View style={styles.categoriesList}>
							{["Musique", "Art", "Sport", "Marché", "Technologie"].map(
								(category, index) => (
									<View
										key={index}
										style={[
											styles.categoryItem,
											{ backgroundColor: colors.grisvif },
										]}
									>
										<Text style={{ color: themeColors.text }}>{category}</Text>
									</View>
								)
							)}
						</View>
					</View>

					{/* Organizers */}
					<View style={styles.sectionContainer}>
						<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
							{t("organizers")}
						</Text>
						<View style={styles.organizersList}>
							{organizers.map((organizer) => (
								<View key={organizer.id} style={styles.organizerItem}>
									<Image
										source={{ uri: organizer.image }}
										style={styles.organizerImage}
									/>
									<Text
										style={[styles.organizerName, { color: themeColors.text }]}
									>
										{organizer.name}
									</Text>
									<Text
										style={[
											styles.organizerEvents,
											{ color: colors.customBlue },
										]}
									>
										{organizer.events} événements
									</Text>
								</View>
							))}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	heroSection: {
		marginVertical: 20,
	},
	heroTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	heroSubtitle: {
		fontSize: 16,
		marginBottom: 20,
	},
	viewAllButton: {
		alignSelf: "flex-start",
	},
	ctaContainer: {
		padding: 20,
		borderRadius: 10,
		marginVertical: 20,
		alignItems: "center",
	},
	ctaText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	ctaButton: {
		minWidth: 150,
	},
	sectionContainer: {
		marginVertical: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
	},
	categoriesList: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	categoryItem: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 8,
		marginBottom: 10,
		width: "48%",
		alignItems: "center",
	},
	organizersList: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	organizerItem: {
		width: "48%",
		marginBottom: 20,
	},
	organizerImage: {
		width: "100%",
		height: 100,
		borderRadius: 8,
		marginBottom: 8,
	},
	organizerName: {
		fontWeight: "bold",
		marginBottom: 4,
	},
	organizerEvents: {
		fontSize: 12,
	},
});

export default HomeScreen;
