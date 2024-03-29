import { StyleSheet } from "react-native";
import { colors, defaultBorderRadius, screenWidth } from "../../styles";

export default StyleSheet.create({
	modalContainer: {
		display: "flex",
		height: "100%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-end"
	},
	modalContent: {
		height: 400,
		width: screenWidth - 24,
		backgroundColor: colors.secondaryDark,
		borderRadius: defaultBorderRadius,
		color: colors.text,
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	modalHr: {
		width: screenWidth / 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: colors.text,
		marginTop: 16,
		marginBottom: 16
	},
	modalWideHr: {
		width: screenWidth - 64,
		height: 2,
		borderRadius: 2,
		backgroundColor: colors.text,
		marginTop: 8,
		marginBottom: 8
	},
	modalTitle: {
		fontFamily: "Poppins_400",
		fontSize: 24,
		color: colors.text
	},
	modalLabel: {
		fontFamily: "Poppins_400",
		fontSize: 18,
		color: colors.text
	},
	modalFormContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: screenWidth - 64
	},
	modalInput: {
		fontFamily: "Poppins_400",
		width: screenWidth - 64,
		height: 40,
		borderRadius: 8,
		backgroundColor: colors.secondaryLight,
		color: colors.text,
		fontSize: 16,
		padding: 8,
		marginTop: 8,
		marginBottom: 8
	},
	modalDateInput: {
		fontFamily: "Poppins_400",
		width: 150,
		height: 40,
		borderRadius: 8
	},
	modalButtonContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		width: screenWidth - 64,
		height: 40,
		marginTop: 16,
		marginBottom: 16
	},
	modalButtonText: {
		fontFamily: "Poppins_400",
		fontSize: 18,
		color: colors.text
	},
	modalButtonCancel: {
		width: 150,
		height: 60,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: colors.secondaryLight,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	modalButtonAdd: {
		width: 150,
		height: 60,
		borderRadius: 8,
		backgroundColor: colors.secondaryLight,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	},
	headerContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		width: screenWidth,
		height: "100%"
	},
	NoBillContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		textAlign: "center",
		width: screenWidth - 32,
		borderRadius: defaultBorderRadius,
		height: 160,
		marginTop: "auto",
		marginBottom: "auto",
		backgroundColor: colors.secondaryLight
	},
	BillContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: screenWidth,
		height: 160,
		marginTop: 10,
		marginBottom: 20
	},
	BillTitle: {
		fontFamily: "Poppins_400",
		fontSize: 24,
		color: colors.text,
		marginTop: 32
	},
	BillBox: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: colors.secondaryDark,
		width: screenWidth - 32,
		height: 120,
		borderRadius: defaultBorderRadius,
		marginBottom: 16,
		marginTop: 8
	},
	BillContentContainer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly"
	},

	BillRightSection: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-evenly",
		height: "100%",
		width: "75%"
	},
	BillImage: {
		width: "25%"
	},
	BillContent: {
		fontFamily: "Poppins_400",
		fontSize: 22,
		color: colors.text
	},
	BillDate: {
		fontFamily: "Poppins_300",
		fontSize: 16,
		color: colors.text
	},
	leftSwipe: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		height: "100%",
		backgroundColor: colors.secondaryLight
	},
	leftSwipeText: {
		fontFamily: "Poppins_400",
		fontSize: 24,
		color: colors.text,
		marginLeft: 16
	},
	icon: {
		position: "absolute",
		right: 16
	},
	scrollableBillsView: {
		height: "100%"
	},
	otherBillData: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: 520
	}
	// containerBlur: {
	// 	// filter: "blur(10px)",
	// 	width: screenWidth,
	// 	height: "100%",
	// 	backgroundColor: "rgba(0,0,0,0.1)",
	// },
});
