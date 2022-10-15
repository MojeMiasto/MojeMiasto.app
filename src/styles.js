import { StyleSheet } from "react-native";

export const defaultBorderRadius = 16;
export const defaultPadding = 16;
export const colors = {
	primaryDark: "#030e0a",
	primaryLight: "#081c15",
	secondaryDark: "#1b4332",
	secondaryLight: "#2d6a4f",
	accentDark: "#40916c",
	accentLight: "#52b788",
	text: "#d8f3dc",
	textDark: "#b7e4c7"
};

export default StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: "center",
		padding: defaultPadding
		// backgroundColor: "#081C15"
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%"
	}
});
