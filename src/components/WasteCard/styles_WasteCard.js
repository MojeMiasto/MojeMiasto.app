import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../styles";

export default StyleSheet.create({
	container: {
		width: Dimensions.get("window").width - 32,
		height: 334,
		backgroundColor: "#1B4332",
		padding: 24,
		borderRadius: 16,
		flexDirection: "column",
		shadowColor: "#000",
		shadowOffset: { height: 10, width: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		marginRight: 16
	},
	content: {
		paddingBottom: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: {
		paddingTop: 8,
		fontSize: 24,
		fontWeight: "bold",
		letterSpacing: 1,
		color: "#D8F3DC",
		fontFamily: "Poppins_400",
		maxWidth: Dimensions.get("window").width - 180
	},
	text: {
		fontFamily: "Poppins_300",
		letterSpacing: 1,
		fontSize: 18,
		color: colors.text
	},
	date: {
		color: "#B7E4C7"
	}
});
