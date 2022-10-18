import { StyleSheet } from "react-native";
import { colors, screenWidth } from "../../styles";

export default StyleSheet.create({
	title: {
		fontFamily: "Poppins_400",
		fontSize: 32,
		color: colors.text
	},
	subtitle: {
		fontFamily: "Poppins_300",
		fontSize: 24,
		color: colors.textDark,
		textAlign: "center",
		marginTop: 32
	},
	button_wrapper: {
		marginTop: screenWidth * 0.3,
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
