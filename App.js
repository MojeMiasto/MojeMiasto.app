import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NextWasteCard from "./src/components/NextWasteCard/NextWasteCard";
import WasteCard from "./src/components/WasteCard/WasteCard";
import WasteScreen from "./src/screens/WasteScreen/WasteScreen";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="light" />
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					tabBarStyle: { backgroundColor: "#1B4332", borderTopWidth: 0 },
					tabBarInactiveTintColor: "#D8F3DC",
					tabBarActiveTintColor: "#95D5B2"
				}}
			>
				<Tab.Screen name="Wywóz Odpadów" component={WasteScreen} />
				<Tab.Screen name="Next-Waste2" component={WasteCard} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
