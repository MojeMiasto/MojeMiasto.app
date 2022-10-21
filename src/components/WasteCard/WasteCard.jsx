import { View, Text, Image } from "react-native";
import calendar from "../../assets/img/calendar.png";
import style from "./styles_WasteCard";

export default function WasteCard({ wasteData, wasteTypes }) {
	return (
		<View style={style.container}>
			<View style={style.content}>
				<Text style={style.title}>WasteCard</Text>
			</View>
			<Image source={calendar} />
		</View>
	);
}
