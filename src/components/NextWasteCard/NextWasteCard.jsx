import { View, Text, Image } from "react-native";
import wastebin from "../../assets/img/wastebin.png";
import style from "./styles_NextWasteCard.js";
import moment from "moment";
import { AdjustFontSize } from "../../AdjustFontSize";

export default function NextWasteCard({ wasteType, wasteDate }) {
	moment.locale("pl");
	const date = moment(wasteDate).format("dddd, D MMMM YYYY");

	return (
		<View style={style.container}>
			<Image source={wastebin} />
			<View style={style.content}>
				<Text style={style.date}>{date}</Text>
				<AdjustFontSize
					text={wasteType}
					fontSize={style.title.fontSize}
					numberOfLines={2}
					style={style.title}
				/>
			</View>
		</View>
	);
}
