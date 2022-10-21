import { StyleSheet } from "react-native";
import { colors, screenWidth } from "../../styles";

export default StyleSheet.create({
	container: {
		backgroundColor: colors.secondaryDark,
		paddingVertical: 16,
		paddingHorizontal: 24,
		width: screenWidth - 32,
		borderRadius: 16,
		flexDirection: "column",
		shadowColor: "#000",
		shadowOffset: { height: 10, width: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		marginBottom: 16
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	title: {
		fontFamily: "Poppins_400",
		fontSize: 24,
		color: colors.text,
		letterSpacing: 0.5,
		marginBottom: 12
	},
	text: {
		fontFamily: "Poppins_300",
		fontSize: 20,
		color: colors.textDark
	},
	textHighlight: {
		fontFamily: "Poppins_400",
		fontSize: 20,
		color: colors.text
	},
	content: {
		flex: 1,
		paddingLeft: 16,
		justifyContent: "space-around"
	}
});