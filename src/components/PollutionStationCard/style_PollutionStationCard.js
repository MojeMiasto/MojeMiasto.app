import { StyleSheet } from "react-native";
import { colors, screenWidth } from "../../styles";

export default StyleSheet.create({
	container: {
		backgroundColor: colors.secondaryDark,
		padding: 11,
		width: screenWidth - 32,
		borderRadius: 16,
		flexDirection: "row",
		shadowColor: "#000",
		shadowOffset: { height: 10, width: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 10
	},
	title: {
		fontFamily: "Poppins_400",
		fontSize: 24,
		color: colors.text,
		letterSpacing: 0.5
	},
	text: {
		fontFamily: "Poppins_300",
		fontSize: 16,
		color: colors.textDark
	},
	content: {
		flex: 1,
		paddingLeft: 16,
		justifyContent: "space-around"
	}
});
