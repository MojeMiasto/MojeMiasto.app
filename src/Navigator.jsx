import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import { colors } from "./styles";

import WasteScreen from "./screens/WasteScreen/WasteScreen";

import { screenOptions } from "./screenOptions";
import WelcomeScreen from "./screens/WelcomeScreen/WelcomeScreen";
import PollutionScreen from "./screens/PollutionScreen/PollutionScreen";
import FailureScreen from "./screens/FailureScreen/FailureScreen";

import LocationScreen from "./screens/LocationScreen/LocationScreen";
import LocationStreetScreen from "./screens/LocationStreetScreen/LocationStreetScreen";
import LocationStreetNumberScreen from "./screens/LocationStreetNumberScreen/LocationStreetNumberScreen";
import BillsScreen from "./screens/BillsScreen/BillsScreen";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigator({ welcome }) {
	const { t } = useTranslation();

	return (
		<NavigationContainer>
			<StatusBar style="light" />
			<Stack.Navigator
				screenOptions={screenOptions}
				initialRouteName={welcome ? "Welcome" : "App"}
			>
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen name="Location" component={LocationScreen} />
				<Stack.Screen name="Location_street" component={LocationStreetScreen} />
				<Stack.Screen
					name="Location_streetNumber"
					component={LocationStreetNumberScreen}
				/>
				<Stack.Screen name="App" component={TabNav} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

function TabNav() {
	const { t } = useTranslation();

	return (
		<Tab.Navigator
			screenOptions={screenOptions}
			shifting={true}
			barStyle={{ backgroundColor: colors.primaryLight }}
			inactiveColor={colors.text}
			activeColor={colors.accentLight}
		>
			<Tab.Screen
				name="Failures"
				component={FailureScreen}
				options={{ tabBarLabel: t("navigation:failures") }}
			/>
			<Tab.Screen
				name="Waste"
				component={WasteScreen}
				options={{ tabBarLabel: t("navigation:waste") }}
			/>
			{Platform.OS === "ios" && (
				<Tab.Screen
					name="Receipts"
					component={BillsScreen}
					options={{ tabBarLabel: t("navigation:bills") }}
				/>
			)}
			<Tab.Screen
				name="Pollution"
				component={PollutionScreen}
				options={{ tabBarLabel: t("navigation:pollution") }}
			/>
		</Tab.Navigator>
	);
}
