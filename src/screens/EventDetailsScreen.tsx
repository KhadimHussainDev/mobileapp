import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
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
import { Event, events, organizers } from "../constants/mockData";
import { RootStackParamList } from "../navigation/types";
import { useTheme } from "../themes/ThemeProvider";
import ScreenWrapper from "./ScreenWrapper";

type EventDetailsRouteProp = RouteProp<RootStackParamList, "EventDetails">;
type EventDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EventDetailsScreen = () => {
	const { t } = useTranslation("doc");
	const route = useRoute<EventDetailsRouteProp>();
	const navigation = useNavigation<EventDetailsNavigationProp>();
	const { colors, themeColors } = useTheme();
	const [event, setEvent] = useState<Event | null>(null);
	const [timeLeft, setTimeLeft] = useState<string>("");

	useEffect(() => {
		const foundEvent = events.find((e) => e.id === route.params.id);
		if (foundEvent) {
			setEvent(foundEvent);
		}
	}, [route.params.id]);

	useEffect(() => {
		if (event) {
			const deadline = new Date(event.deadline).getTime();

			const timer = setInterval(() => {
				const now = new Date().getTime();
				const distance = deadline - now;

				if (distance < 0) {
					clearInterval(timer);
					setTimeLeft("Événement terminé");
					return;
				}

				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				setTimeLeft(`${days}j ${hours}h ${minutes}m ${seconds}s`);
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [event]);

	if (!event) {
		return (
			<SafeAreaView
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<Text>Chargement...</Text>
			</SafeAreaView>
		);
	}

	return (
		<ScreenWrapper>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: themeColors.background }}
			>
				<ScrollView style={styles.container}>
					<Image source={{ uri: event.image }} style={styles.image} />

					<View style={styles.headerContainer}>
						<Text style={[styles.title, { color: themeColors.text }]}>
							{event.title}
						</Text>
						<Text style={[styles.date, { color: colors.customBlue }]}>
							{event.date}
						</Text>
						<Text style={[styles.location, { color: themeColors.text }]}>
							{event.location}
						</Text>

						<View
							style={[
								styles.priceContainer,
								{ backgroundColor: colors.grisvif },
							]}
						>
							<Text style={[styles.price, { color: themeColors.text }]}>
								{event.price || "Gratuit"}
							</Text>
						</View>
					</View>

					<View
						style={[
							styles.countdownContainer,
							{ backgroundColor: colors.customBlue },
						]}
					>
						<Text style={styles.countdownTitle}>Temps restant:</Text>
						<Text style={styles.countdown}>{timeLeft}</Text>
					</View>

					<View style={styles.section}>
						<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
							Description
						</Text>
						<Text style={[styles.description, { color: themeColors.text }]}>
							{event.description}
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
							Organisateur
						</Text>
						<Text style={[styles.organizer, { color: themeColors.text }]}>
							{event.organizer}
						</Text>
					</View>

					<View style={styles.section}>
						<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
							Catégorie
						</Text>
						<View
							style={[
								styles.categoryContainer,
								{ backgroundColor: colors.grisvif },
							]}
						>
							<Text style={[styles.category, { color: themeColors.text }]}>
								{event.category}
							</Text>
						</View>
					</View>

					<CustomButton
						title={t("register")}
						onPress={() => {}}
						style={styles.registerButton}
					/>

					<View style={styles.sectionDivider} />

					<View style={styles.organizersSection}>
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
	image: {
		width: "100%",
		height: 200,
		borderRadius: 12,
		marginBottom: 20,
	},
	headerContainer: {
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	date: {
		fontSize: 16,
		marginBottom: 4,
	},
	location: {
		fontSize: 16,
		marginBottom: 12,
	},
	priceContainer: {
		alignSelf: "flex-start",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
	},
	countdownContainer: {
		padding: 15,
		borderRadius: 8,
		marginBottom: 20,
		alignItems: "center",
	},
	countdownTitle: {
		color: "white",
		fontSize: 16,
		marginBottom: 5,
	},
	countdown: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
	},
	organizer: {
		fontSize: 16,
	},
	categoryContainer: {
		alignSelf: "flex-start",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
	},
	category: {
		fontSize: 16,
	},
	registerButton: {
		marginVertical: 20,
	},
	sectionDivider: {
		height: 1,
		backgroundColor: "#E5E7EB",
		marginVertical: 20,
	},
	organizersSection: {
		marginBottom: 20,
	},
	organizersList: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	organizerItem: {
		width: "48%",
		marginBottom: 15,
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

export default EventDetailsScreen;
