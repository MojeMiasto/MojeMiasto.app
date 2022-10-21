import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
	container: {
		width: Dimensions.get("window").width - 32,
		height: 122,
		backgroundColor: "#1B4332",
		padding: 11,
		borderRadius: 16,
		flexDirection: "row",
		shadowColor: "#000",
		shadowOffset: { height: 10, width: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 10,
		marginBottom: 11
	},
	content: {
		flex: 1,
		paddingLeft: 16,
		justifyContent: "space-around"
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		letterSpacing: 1,
		color: "#D8F3DC"
	},
	date: {
		color: "#B7E4C7"
	}
});
