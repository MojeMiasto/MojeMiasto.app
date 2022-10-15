import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import WasteCard from "./src/components/WasteCard/WasteCard";
import WasteScreen from "./src/screens/WasteScreen/WasteScreen";

import { screenOptions } from "./screenOptions";

const Tab = createBottomTabNavigator();

export default function Navigator() {
	const { t } = useTranslation();

	return (
		<NavigationContainer>
			<StatusBar style="light" />
			<Tab.Navigator screenOptions={screenOptions}>
				<Tab.Screen
					name="Waste"
					component={WasteScreen}
					options={{ tabBarLabel: t("navigation:waste") }}
				/>
				<Tab.Screen
					name="Failures"
					component={WasteCard}
					options={{ tabBarLabel: t("navigation:failures") }}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
