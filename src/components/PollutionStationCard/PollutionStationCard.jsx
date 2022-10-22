import { View, Text, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import pin from "../../assets/img/pin.png";

import style from "./style_PollutionStationCard.js";

export default function PollutionStationCard({ stationData }) {
	return (
		<View style={style.container}>
			<Image source={pin} />
			<View style={style.content}>
				<Text numberOfLines={1} style={style.title} adjustsFontSizeToFit={true}>
					Stacja Pomiarowa
					<Ionicons name="chevron-down-outline" size={24} />
				</Text>
				<Text style={style.text}>{stationData?.name}</Text>
				<Text style={style.text}>
					Odległość stacji: {Number(stationData?.distance).toFixed(2)} km
				</Text>
			</View>
		</View>
	);
}
