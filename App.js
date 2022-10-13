import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import NextWasteCard from "./src/components/NextWasteCard/NextWasteCard";
import WasteCard from "./src/components/WasteCard/WasteCard";
import WasteScreen from "./src/screens/WasteScreen/WasteScreen";

import { colors } from "./styles";

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
	headerShown: false,
	tabBarIcon: ({ focused, color, size }) => {
		let iconName;

		if (route.name === "Waste") {
			iconName = focused ? "ios-trash" : "ios-trash-outline";
		} else if (route.name === "Awarie") {
			iconName = focused ? "ios-warning" : "ios-warning-outline";
		}

		return <Ionicons name={iconName} size={size} color={color} />;
	},
	tabBarStyle: {
		backgroundColor: colors.primaryLight,
		borderTopWidth: 0
	},
	tabBarInactiveTintColor: colors.text,
	tabBarActiveTintColor: colors.accentLight
});

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="light" />
			<Tab.Navigator screenOptions={screenOptions}>
				<Tab.Screen name="Awarie" component={WasteCard} />
				<Tab.Screen name="Waste" component={WasteScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
