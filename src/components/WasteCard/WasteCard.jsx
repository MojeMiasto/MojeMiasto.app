import { View, Text, Image } from "react-native";
import calendar from "../../assets/img/calendar.png";
import style from "./styles_WasteCard";

export default function WasteCard({ wasteData = [], wasteTypes = [] }) {
	return (
		<View style={style.container}>
			<View style={style.content}>
				<Text style={style.title}>
					{wasteTypes[wasteData[0]?.wasteId]?.wasteName}
				</Text>
				<Image source={calendar} />
			</View>

			<View>
				{wasteData.map((item, index) => {
					const date = new Date(item.date);
					const dateOptions = {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric"
					};
					const dateFormatted = date.toLocaleDateString("default", dateOptions);

					return (
						<Text key={index} style={style.text}>
							{dateFormatted}
						</Text>
					);
				})}
			</View>
		</View>
	);
}
