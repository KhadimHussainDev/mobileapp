import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	ActivityIndicator,
	Image,
	ImageBackground,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Event } from "../constants/mockData";
import { RootStackParamList } from "../navigation/types";
import dbService from "../services/DatabaseService";
import { useTheme } from "../themes/ThemeProvider";
import ScreenWrapper from "./ScreenWrapper";

// Simple countdown component
const Countdown = ({ targetDate }: { targetDate: Date }) => {
	const [timeLeft, setTimeLeft] = useState<string>("");
	const { t } = useTranslation("doc");

	useEffect(() => {
		const deadline = targetDate.getTime();

		const timer = setInterval(() => {
			const now = new Date().getTime();
			const distance = deadline - now;

			if (distance < 0) {
				clearInterval(timer);
				setTimeLeft(t("eventEnded"));
				return;
			}

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate, t]);

	return <Text style={styles.countdown}>{timeLeft}</Text>;
};

type EventDetailsRouteProp = RouteProp<RootStackParamList, "EventDetails">;
type EventDetailsNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	"EventDetails"
>;

const EventDetailsScreen = () => {
	const { t } = useTranslation("doc");
	const route = useRoute<EventDetailsRouteProp>();
	const navigation = useNavigation<EventDetailsNavigationProp>();
	const { colors, themeColors } = useTheme();
	const [event, setEvent] = useState<Event | null>(null);
	const [organizers, setOrganizers] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEventDetails = async () => {
			setLoading(true);
			try {
				// Get event details from the database service
				const eventData = await dbService.getEventById(route.params.id);
				const organizersData = await dbService.getAllOrganizers();

				setEvent(eventData);
				setOrganizers(organizersData);
			} catch (error) {
				console.error("Error fetching event details:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEventDetails();
	}, [route.params.id]);

	// Find the organizer of the event
	const organizer =
		event && organizers.find((org) => org.id === event.organizer);

	if (loading) {
		return (
			<ScreenWrapper>
				<SafeAreaView
					style={{ flex: 1, backgroundColor: themeColors.background }}
				>
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color={colors.customBlue} />
					</View>
				</SafeAreaView>
			</ScreenWrapper>
		);
	}

	if (!event) {
		return (
			<ScreenWrapper>
				<SafeAreaView
					style={{ flex: 1, backgroundColor: themeColors.background }}
				>
					<View style={styles.errorContainer}>
						<Text style={[styles.errorText, { color: themeColors.text }]}>
							{t("eventNotFound")}
						</Text>
					</View>
				</SafeAreaView>
			</ScreenWrapper>
		);
	}

	return (
		<ScreenWrapper>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: themeColors.background }}
			>
				<ScrollView style={styles.container}>
					<ImageBackground
						source={{ uri: event.image }}
						style={styles.headerImage}
					>
						<View style={styles.headerOverlay}>
							<Text style={styles.title}>{event.title}</Text>
							<Countdown targetDate={new Date(event.date)} />
						</View>
					</ImageBackground>

					<View style={styles.content}>
						<View style={styles.section}>
							<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
								{t("Date")}
							</Text>
							<Text style={[styles.sectionText, { color: themeColors.text }]}>
								{new Date(event.date).toLocaleDateString()} -{" "}
								{new Date(event.date).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</Text>
						</View>

						<View style={styles.section}>
							<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
								{t("Location")}
							</Text>
							<Text style={[styles.sectionText, { color: themeColors.text }]}>
								{event.location}
							</Text>
						</View>

						<View style={styles.section}>
							<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
								{t("Price")}
							</Text>
							<Text style={[styles.sectionText, { color: themeColors.text }]}>
								{typeof event.price === "number" && event.price > 0
									? `${event.price} €`
									: t("free")}
							</Text>
						</View>

						<View style={styles.section}>
							<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
								{t("Description")}
							</Text>
							<Text style={[styles.sectionText, { color: themeColors.text }]}>
								{event.description}
							</Text>
						</View>

						{organizer && (
							<View style={styles.section}>
								<Text
									style={[styles.sectionTitle, { color: colors.grandTitre }]}
								>
									{t("Organizer")}
								</Text>
								<View style={styles.organizerContainer}>
									{organizer.image && (
										<Image
											source={{ uri: organizer.image }}
											style={styles.organizerLogo}
										/>
									)}
									<View style={styles.organizerInfo}>
										<Text
											style={[
												styles.organizerName,
												{ color: themeColors.text },
											]}
										>
											{organizer.name}
										</Text>
									</View>
								</View>
							</View>
						)}

						<View style={styles.section}>
							<Text style={[styles.sectionTitle, { color: colors.grandTitre }]}>
								{t("Category")}
							</Text>
							<View style={styles.categoryContainer}>
								<Text
									style={[
										styles.category,
										{
											backgroundColor: colors.customBlue,
											color: colors.white,
										},
									]}
								>
									{event.category}
								</Text>
							</View>
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
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	errorText: {
		fontSize: 18,
		textAlign: "center",
	},
	headerImage: {
		height: 250,
		justifyContent: "flex-end",
	},
	headerOverlay: {
		backgroundColor: "rgba(0,0,0,0.4)",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginBottom: 10,
	},
	countdown: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	content: {
		padding: 20,
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	sectionText: {
		fontSize: 16,
		lineHeight: 24,
	},
	categoryContainer: {
		flexDirection: "row",
	},
	category: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
		overflow: "hidden",
		fontSize: 14,
		fontWeight: "bold",
	},
	organizerContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	organizerLogo: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 15,
	},
	organizerInfo: {
		flex: 1,
	},
	organizerName: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 4,
	},
	organizerDescription: {
		fontSize: 14,
		lineHeight: 20,
	},
});

export default EventDetailsScreen;
