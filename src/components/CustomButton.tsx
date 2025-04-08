import React from "react";
import {
	ActivityIndicator,
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from "react-native";
import { useTheme } from "../themes/ThemeProvider";

interface CustomButtonProps {
	title: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	loading?: boolean;
	disabled?: boolean;
	variant?: "primary" | "secondary" | "outline";
}

const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	style,
	textStyle,
	loading = false,
	disabled = false,
	variant = "primary",
}) => {
	const { colors } = useTheme();

	const getButtonStyles = () => {
		switch (variant) {
			case "primary":
				return {
					backgroundColor: disabled ? colors.grisvif : colors.customBlue,
					borderColor: colors.customBlue,
				};
			case "secondary":
				return {
					backgroundColor: disabled ? colors.grisvif : colors.orangeclaire,
					borderColor: colors.orangeclaire,
				};
			case "outline":
				return {
					backgroundColor: "transparent",
					borderColor: colors.customBlue,
				};
			default:
				return {
					backgroundColor: disabled ? colors.grisvif : colors.customBlue,
					borderColor: colors.customBlue,
				};
		}
	};

	const getTextStyles = () => {
		switch (variant) {
			case "primary":
			case "secondary":
				return { color: colors.white };
			case "outline":
				return { color: colors.customBlue };
			default:
				return { color: colors.white };
		}
	};

	return (
		<TouchableOpacity
			style={[
				styles.button,
				getButtonStyles(),
				disabled && styles.disabled,
				style,
			]}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.7}
		>
			{loading ? (
				<ActivityIndicator
					color={variant === "outline" ? colors.customBlue : colors.white}
				/>
			) : (
				<Text style={[styles.text, getTextStyles(), textStyle]}>{title}</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		minWidth: 120,
	},
	text: {
		fontSize: 16,
		fontWeight: "600",
	},
	disabled: {
		opacity: 0.6,
	},
});

export default CustomButton;
