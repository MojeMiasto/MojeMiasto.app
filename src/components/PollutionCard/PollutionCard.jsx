import { Text, View } from "react-native";
import moment from "moment";

import style from "./style_PollutionCard.js";

export default function PollutionCard({
	indexLevel,
	sourceDataDate,
	name,
	air = false
}) {
	const time = moment(sourceDataDate).format("HH:mm");

	return (
		<View style={style.container}>
			<Text style={style.title}>{name}</Text>
			<View style={style.row}>
				<Text style={style.text}>
					{air ? "Jakość powietrza:" : "Poziom stężenia:"}
				</Text>
				<Text style={style.textHighlight}>{indexLevel?.indexLevelName}</Text>
			</View>
			<View style={style.row}>
				<Text style={style.text}>Godzina pomiaru:</Text>
				<Text style={style.textHighlight}>{time}</Text>
			</View>
		</View>
	);
}
