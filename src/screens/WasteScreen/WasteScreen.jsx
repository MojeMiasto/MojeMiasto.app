import { SafeAreaView, View, Text } from "react-native";

import defaultStyles from "../../../styles.js";
import NextWasteCard from "../../components/NextWasteCard/NextWasteCard";
import WasteCard from "../../components/WasteCard/WasteCard.jsx";

export default function WasteScreen() {
	return (
		<SafeAreaView style={defaultStyles.wrapper}>
			<View style={{ height: 100 }} />
			<NextWasteCard wasteType={"Papier"} wasteDate={"21.07.2019"} />
			<View style={{ height: 100 }} />
			<WasteCard />
		</SafeAreaView>
	);
}
