import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
	useFonts,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_500Medium
} from "@expo-google-fonts/poppins";
import { Vollkorn_400Regular } from "@expo-google-fonts/vollkorn";
import AnimatedSplash from "react-native-animated-splash-screen";

import WasteCard from "./src/components/WasteCard/WasteCard";
import WasteScreen from "./src/screens/WasteScreen/WasteScreen";

import { screenOptions } from "./screenOptions";
import "./IMLocalize";
import { colors } from "./styles";

const Tab = createBottomTabNavigator();

SplashScreen.hideAsync();

export default function App() {
	const { t } = useTranslation();
	const [isReady, setIsReady] = useState(false);
	const [fontsLoaded] = useFonts({
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_500Medium,
		Vollkorn_400Regular
	});

	useEffect(() => {
		async function prepare() {
			try {
				await Font.loadAsync(Ionicons.font);
				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (e) {
				console.error(e);
			} finally {
				setIsReady(true);
			}
		}
		prepare();
	}, []);

	const onReady = useEffect(() => {
		async function a() {
			if (isReady && fontsLoaded) {
				await SplashScreen.hideAsync();
			}
		}
		a();
	}, [isReady, fontsLoaded]);

	return (
		<AnimatedSplash
			translucent={true}
			isLoaded={isReady && fontsLoaded}
			logoImage={require("./assets/logo.png")}
			logoWidth={214}
			logoHeight={164}
			backgroundColor={colors.primaryLight}
		>
			<NavigationContainer onReady={onReady}>
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
		</AnimatedSplash>
	);
}
