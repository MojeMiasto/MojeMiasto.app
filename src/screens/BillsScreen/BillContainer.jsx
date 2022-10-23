import { Text, View, Image, Animated } from "react-native";
import React from "react";
import style from "./styles_BillsScreen";
import { useTranslation } from "react-i18next";
import BillImageRotate from "../../assets/img/billNearest.png";
import BillImage from "../../assets/img/bill.png";
import moment from "moment";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function BillContainer(props) {
	const bill = props.bill;
	const image = props.image == 1 ? BillImageRotate : BillImage;
	moment.locale("pl");
	// const date = moment(wasteDate).format("dddd, D MMMM YYYY");
	const { t } = useTranslation();
	const billName = bill.name;
	const billDay = moment(bill.date).format("dddd");
	const billDate = moment(bill.date).format("D.M.YYYY");
	const billAmount = bill.amount;
	const billId = bill.id;

	return (
		<View style={style.BillBox} key={billId}>
			<Image source={image} />
			<View style={style.BillRightSection}>
				<View style={style.BillContentContainer}>
					<Text style={style.BillDate}>{billDay}</Text>
					<Text style={style.BillDate}>{billDate}</Text>
				</View>
				<View style={style.BillContentContainer}>
					<Text style={style.BillContent}>{billName}</Text>
					<Text style={style.BillContent}>{billAmount} zł</Text>
				</View>
			</View>
		</View>
	);
}
