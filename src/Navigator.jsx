import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import WasteCard from "./components/WasteCard/WasteCard";
import WasteScreen from "./screens/WasteScreen/WasteScreen";

import { screenOptions } from "./screenOptions";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import LocationScreen from "./screens/LocationScreen/LocationScreen";

import LocationStreetScreen from "./screens/LocationStreetScreen/LocationStreetScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigator({ welcome }) {
	const { t } = useTranslation();

	return (
		<NavigationContainer>
			<StatusBar style="light" />
			{welcome ? (
				<Stack.Navigator screenOptions={screenOptions}>
					<Stack.Screen name="Welcome" component={WelcomeScreen} />
					<Stack.Screen name="Location" component={LocationScreen} />
					<Stack.Screen
						name="Location_street"
						component={LocationStreetScreen}
					/>
				</Stack.Navigator>
			) : (
				<Tab.Navigator screenOptions={screenOptions}>
					<Tab.Screen
						name="Failures"
						component={WasteCard}
						options={{ tabBarLabel: t("navigation:failures") }}
					/>
					<Tab.Screen
						name="Waste"
						component={WasteScreen}
						options={{ tabBarLabel: t("navigation:waste") }}
					/>
				</Tab.Navigator>
			)}
		</NavigationContainer>
	);
}
