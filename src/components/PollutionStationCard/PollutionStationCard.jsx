import { View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import pin from "../../assets/img/pin.png";

import style from "./style_PollutionStationCard.js";

export default function PollutionStationCard({ stationData }) {
	return (
		<View style={style.container}>
			<Image source={pin} />
			<View style={style.content}>
				<Text style={style.title}>
					Stacja Pomiarowa
					{/* <Ionicons name="chevron-down-outline" size={24} /> */}
				</Text>
				<Text style={style.text}>{stationData?.name}</Text>
				<Text style={style.text}>
					Odległość stacji: {Math.round(stationData?.distance * 10) / 10} km
				</Text>
			</View>
		</View>
	);
}
