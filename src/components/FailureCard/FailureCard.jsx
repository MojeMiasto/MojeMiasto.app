import { View, Text, Image } from "react-native";
import moment from "moment";

import tools from "../../assets/img/tools.png";
import lightbulb from "../../assets/img/lightbulb.png";
import style from "./style_FailureCard";

export default function FailureCard({
	isElectricity = true,
	startDate,
	endDate,
	message = "",
	failureType = {},
	failureCategory = {}
}) {
	moment.locale("pl");
	const startDay = moment(startDate).date();
	const startMonth = moment(startDate).month();
	const startYear = moment(startDate).year();
	const endDay = moment(endDate).date();
	const endMonth = moment(endDate).month();
	const endYear = moment(endDate).year();

	let date = "";

	if (startYear === endYear) {
		date = `${moment(startDate).format("DD MMM")} - ${moment(endDate).format(
			"DD MMM YYYY"
		)}`;

		if (startMonth == endMonth) {
			date = `${startDay} - ${moment(endDate).format("DD MMM YYYY")}`;

			if (startDay == endDay) {
				date = `${moment(startDate).format("HH:mm")} - ${moment(endDate).format(
					"HH:mm, DD MMM YYYY"
				)}`;
			}
		} else {
			date = `${moment(startDate).format("DD MMM")} - ${moment(endDate).format(
				"DD MMM YYYY"
			)}`;
		}
	} else {
		date = `${moment(startDate).format("DD MMM YYYY")} - ${moment(
			endDate
		).format("DD MMM YYYY")}`;
	}

	return (
		<View style={style.container}>
			<View style={style.row}>
				<Image source={isElectricity ? lightbulb : tools} />
				<View>
					<Text style={style.title}>{failureType?.failureName}</Text>
					<Text style={style.subtitle}>{failureCategory?.categoryName}</Text>
					<Text style={style.text}>{date}</Text>
				</View>
			</View>
			<View style={style.content}>
				<Text style={style.text}>{message}</Text>
			</View>
		</View>
	);
}
