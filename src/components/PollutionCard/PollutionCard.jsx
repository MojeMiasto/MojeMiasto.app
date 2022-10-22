import { Text, View } from "react-native";
import moment from "moment";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Circle } from "react-native-svg";

import style from "./style_PollutionCard.js";
import { colors } from "../../styles";

function pollutionColor(value) {
	switch (value) {
		case 0:
			return { color: "#4ABF40" };
		case 1:
			return { color: "#B0BF51" };
		case 2:
			return { color: "#BFA440" };
		case 3:
			return { color: "#BF7D40" };
		case 4:
			return { color: "#BF4040" };
		case 5:
			return { color: "#822A2A" };
		default:
			return {};
	}
}

export default function PollutionCard({ data, index = -1, name, air = false }) {
	const time = moment(air ? data?.calcDate : data[0]?.date).format("HH:mm");

	if (air) {
		return (
			<View style={style.container}>
				<Text style={style.title}>
					{name.charAt(0).toUpperCase() + name.slice(1)}
				</Text>

				<View style={[style.row]}>
					<View style={style.column}>
						<Text style={style.text}>
							{air ? "Indeks powietrza:" : "Poziom stężenia:"}
						</Text>
						<Text style={[style.textHighlight, style.title]}>{data?.name}</Text>
					</View>
					<AnimatedCircularProgress
						size={100}
						width={15}
						fill={(data?.id + 1) * 16.6}
						arcSweepAngle={240}
						rotation={-120}
						tintColor="#4ABF40"
						tintColorSecondary="#BF4040"
						backgroundColor={colors.secondaryLight}
						lineCap="round"
					>
						{(fill) => (
							<Text style={style.textHighlight}>{Number(fill).toFixed(1)}</Text>
						)}
					</AnimatedCircularProgress>
				</View>
				<View style={style.row}>
					<Text style={style.text}>Godzina pomiaru:</Text>
					<Text style={style.textHighlight}>{time}</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={style.container}>
			<Text style={style.title}>
				{name.charAt(0).toUpperCase() + name.slice(1)}
			</Text>

			<View style={style.row}>
				<Text style={style.text}>
					{air ? "Jakość powietrza:" : "Poziom stężenia:"}
				</Text>
				<View style={style.row}>
					<Text style={[style.textHighlight, pollutionColor(index)]}>
						{air ? null : Number(data[0]?.value).toFixed(2)}
					</Text>
					{!air && (
						<Text style={[style.unit, pollutionColor(index)]}> µg/m3</Text>
					)}
				</View>
			</View>
			<View style={style.row}>
				<Text style={style.text}>Godzina pomiaru:</Text>
				<Text style={style.textHighlight}>{time}</Text>
			</View>
		</View>
	);
}
