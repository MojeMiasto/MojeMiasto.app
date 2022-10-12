import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import NextWasteCard from "./src/components/NextWasteCard/NextWasteCard";

export default function App() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<StatusBar style="auto" />
			<Text>Ale was sprankowałem</Text>
			<NextWasteCard wasteDate={"21.07.2024"} wasteType={"Plastik"} />
		</View>
	);
}
