import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
	container: {
		width: Dimensions.get("window").width - 48,
		height: 334,
		backgroundColor: "#1B4332",
		padding: 24,
		borderRadius: 16,
		flexDirection: "row",
		shadowColor: "#000",
		shadowOffset: { height: 10, width: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 10
	},
	content: {
		flex: 1,
		paddingLeft: 16
	},
	title: {
		paddingTop: 8,
		fontSize: 24,
		fontWeight: "bold",
		letterSpacing: 1,
		color: "#D8F3DC"
	},
	date: {
		color: "#B7E4C7"
	}
});
