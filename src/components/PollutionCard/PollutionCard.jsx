import { Text, View } from "react-native";
import moment from "moment";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import style from "./style_PollutionCard.js";

function pollutionColor(value) {
	switch (value) {
		case 0:
			return { color: "#4ABF40" };
		case 1:
			return { color: "#B0BF51" };
		case 2:
			return { color: "#000" };
		case 3:
			return { color: "#000" };
		case 4:
			return { color: "#000" };
		case 5:
			return { color: "#000" };
		default:
			return {};
	}
}

export default function PollutionCard({ data, index = -1, name, air = false }) {
	const time = moment(air ? data?.calcDate : data[0]?.date).format("HH:mm");

	return (
		<View style={style.container}>
			<Text style={style.title}>
				{name.charAt(0).toUpperCase() + name.slice(1)}
			</Text>

			<AnimatedCircularProgress
				size={120}
				width={15}
				fill={100}
				tintColor="#fff"
				backgroundColor="#000"
				rotation={0}
				lineCap="round"
				onAnimationComplete={() => console.log("onAnimationComplete")}
			/>

			<View style={style.row}>
				<Text style={style.text}>
					{air ? "Jakość powietrza:" : "Poziom stężenia:"}
				</Text>
				<View style={style.row}>
					<Text style={[style.textHighlight, pollutionColor(index)]}>
						{air ? data?.name : Number(data[0]?.value).toFixed(2)}
					</Text>
					<Text style={[style.unit, pollutionColor(index)]}>
						{air ? "" : " µg/m3"}
					</Text>
				</View>
			</View>
			<View style={style.row}>
				<Text style={style.text}>Godzina pomiaru:</Text>
				<Text style={style.textHighlight}>{time}</Text>
			</View>
		</View>
	);
}
