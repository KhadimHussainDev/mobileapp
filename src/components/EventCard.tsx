import React from "react";
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Event } from "../constants/mockData";
import { useTheme } from "../themes/ThemeProvider";

interface EventCardProps {
	event: Event;
	onPress: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
	const { colors, themeColors } = useTheme();

	return (
		<TouchableOpacity
			style={[
				styles.container,
				{ backgroundColor: themeColors.background, shadowColor: colors.black },
			]}
			onPress={() => onPress(event.id)}
		>
			<Image source={{ uri: event.image }} style={styles.image} />
			<View style={styles.content}>
				<Text style={[styles.title, { color: themeColors.text }]}>
					{event.title}
				</Text>
				<Text style={[styles.date, { color: colors.customBlue }]}>
					{event.date}
				</Text>
				<Text style={[styles.location, { color: themeColors.text }]}>
					{event.location}
				</Text>
				<View style={styles.priceContainer}>
					<Text style={[styles.price, { color: themeColors.text }]}>
						{event.price || "Gratuit"}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const styles = StyleSheet.create({
	container: {
		width: cardWidth,
		backgroundColor: "white",
		borderRadius: 15,
		marginBottom: 20,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	image: {
		width: "100%",
		height: 180,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	content: {
		padding: 15,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	date: {
		fontSize: 14,
		marginBottom: 5,
	},
	location: {
		fontSize: 14,
		marginBottom: 10,
	},
	priceContainer: {
		alignSelf: "flex-start",
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default EventCard;
