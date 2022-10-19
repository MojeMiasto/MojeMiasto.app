import { StyleSheet } from "react-native";
import { colors, screenWidth } from "../../styles";

export default StyleSheet.create({
	container: {
		backgroundColor: colors.secondaryDark,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 16,
		width: screenWidth - 64,
		height: 54,
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 32
	},
	textInput: {
		flex: 1,
		height: "100%",
		fontSize: 20,
		color: colors.text,
		fontFamily: "Poppins_300"
	}
});
