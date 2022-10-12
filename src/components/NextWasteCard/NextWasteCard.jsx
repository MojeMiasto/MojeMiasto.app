import { View, Text, Image } from "react-native";
import wastebin from "../../assets/wastebin.png";
import style from "./styles_NextWasteCard.js";

export default function NextWasteCard({ wasteType, wasteDate }) {
	const dateArray = wasteDate.split(".");
	const date = new Date(
		Number(dateArray[2]),
		Number(dateArray[1]) - 1,
		Number(dateArray[0])
	);
	const dateOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	};

	const dateFormatted = date.toLocaleDateString("default", dateOptions);
	const wasteTypeFormatted = wasteType.toUpperCase();

	return (
		<View style={style.container}>
			<Image source={wastebin} />
			<View style={style.content}>
				<Text style={style.date}>{dateFormatted}</Text>
				<Text style={style.title}>{wasteTypeFormatted}</Text>
			</View>
		</View>
	);
}
