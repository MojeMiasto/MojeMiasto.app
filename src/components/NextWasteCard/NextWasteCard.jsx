import { View, Text, Image } from "react-native";
import wastebin from "../../assets/img/wastebin.png";
import style from "./styles_NextWasteCard.js";
import moment from "moment";
import {useState} from "react";

export default function NextWasteCard({ wasteType, wasteDate }) {
	moment.locale("pl");
	const date = moment(wasteDate).format("dddd, D MMMM YYYY");
	const AdjustLabel = ({
							 fontSize, text, style, numberOfLines
						 }) => {
		const [currentFont, setCurrentFont] = useState(fontSize);

		return (
			<Text
				numberOfLines={ numberOfLines }
				adjustsFontSizeToFit={true}
				style={ [style, { fontSize: currentFont }] }
				onTextLayout={ (e) => {
					const { lines } = e.nativeEvent;
					if (lines.length > numberOfLines) {
						setCurrentFont(currentFont - 1);
					}
				} }
			>
				{ text }
			</Text>
		);
	};
	return (
		<View style={style.container}>
			<Image source={wastebin} />
			<View style={style.content}>
				<Text style={style.date}>{date}</Text>
				{AdjustLabel({fontSize: style.title.fontSize, text: wasteType, style: style.title, numberOfLines: 2})}
			</View>
		</View>
	);
}
