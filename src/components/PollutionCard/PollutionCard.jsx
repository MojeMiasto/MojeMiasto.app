import { Text, View } from "react-native";
import moment from "moment";

import style from "./style_PollutionCard.js";

export default function PollutionCard({
	data,
	name,
	air = false
}) {
	const time = moment(air ? data?.calcDate : data[0]?.date).format("HH:mm");
	return (
		<View style={style.container}>
			<Text style={style.title}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
			<View style={style.row}>
				<Text style={style.text}>
					{air ? "Jakość powietrza:" : "Poziom stężenia:"}
				</Text>
				<Text style={style.textHighlight}>{air ? data?.name : data[0]?.value}</Text>
			</View>
			<View style={style.row}>
				<Text style={style.text}>Godzina pomiaru:</Text>
				<Text style={style.textHighlight}>{time}</Text>
			</View>
		</View>
	);
}
