import { View, Text, Image } from "react-native";
import wastebin from "../../assets/img/wastebin.png";
import style from "./styles_NextWasteCard.js";
import moment from "moment";

export default function NextWasteCard({ wasteType, wasteDate }) {
	moment.locale("pl");
	const date = moment(wasteDate).format("dddd, D MMMM YYYY");

	return (
		<View style={style.container}>
			<Image source={wastebin} />
			<View style={style.content}>
				<Text style={style.date}>{date}</Text>
				<Text style={style.title}>{wasteType}</Text>
			</View>
		</View>
	);
}
