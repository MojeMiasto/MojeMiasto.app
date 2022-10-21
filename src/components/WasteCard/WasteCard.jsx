import moment from "moment/moment";
import { View, Text, Image, ScrollView } from "react-native";
import calendar from "../../assets/img/calendar.png";
import style from "./styles_WasteCard";

export default function WasteCard({
	wasteData = [],
	wasteTypes = [],
	containerStyle = {}
}) {
	return (
		<View style={[style.container, containerStyle]}>
			<View style={style.content}>
				<Text style={style.title}>
					{wasteTypes[wasteData[0]?.wasteId]?.wasteName}
				</Text>
				<Image source={calendar} />
			</View>

			<ScrollView persistentScrollbar={true}>
				{wasteData.filter((item, index) => index < 5).map((item, index) => {
					const date = moment(item.date).format("dddd, D MMMM YYYY");

					return (
						<Text key={index} style={style.text}>
							{date}
						</Text>
					);
				})}
			</ScrollView>
		</View>
	);
}
