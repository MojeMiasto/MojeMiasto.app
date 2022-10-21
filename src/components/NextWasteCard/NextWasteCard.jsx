import { View, Text, Image } from "react-native";
import wastebin from "../../assets/img/wastebin.png";
import style from "./styles_NextWasteCard.js";

export default function NextWasteCard({ wasteType, wasteDate }) {
	const date = new Date(wasteDate);

	const dateOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	};

	const dateFormatted = date.toLocaleDateString("default", dateOptions);
	// const wasteTypeFormatted = wasteType.toUpperCase();

	return (
		<View style={style.container}>
			<Image source={wastebin} />
			<View style={style.content}>
				<Text style={style.date}>{dateFormatted}</Text>
				<Text style={style.title}>{wasteType}</Text>
			</View>
		</View>
	);
	``;
}
