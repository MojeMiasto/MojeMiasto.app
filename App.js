import React, { useState, useEffect } from "react";
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

import "./IMLocalize";
import { colors } from "./styles";
import Navigator from "./Navigator";

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

	return (
		<AnimatedSplash
			translucent={true}
			isLoaded={isReady && fontsLoaded}
			logoImage={require("./assets/logo.png")}
			logoWidth={214}
			logoHeight={164}
			backgroundColor={colors.primaryLight}
		>
			<Navigator />
		</AnimatedSplash>
	);
}
