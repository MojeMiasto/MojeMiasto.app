import { StyleSheet } from "react-native";
import { colors, screenWidth } from "../../styles";

export default StyleSheet.create({
	title: {
		fontFamily: "Poppins_400",
		fontSize: 32,
		color: colors.text
	},
	button_wrapper: {
		justifyContent: "space-around",
		alignItems: "center",
		flexDirection: "row",
		width: screenWidth - 64,
		height: 81,
		padding: 22,
		borderRadius: 16
	},
	button_title: {
		fontFamily: "Poppins_400",
		fontSize: 24,
		color: colors.text
	}
});
