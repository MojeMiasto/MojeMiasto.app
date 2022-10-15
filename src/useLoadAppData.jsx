import { useEffect, useState } from "react";
import {
	useFonts,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_500Medium
} from "@expo-google-fonts/poppins";
import { Vollkorn_400Regular } from "@expo-google-fonts/vollkorn";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";

export default function useLoadAppData() {
	const [isReady, setIsReady] = useState(false);
	const [isAppReady, setIsAppReady] = useState(false);
	const [fontsLoaded] = useFonts({
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_500Medium,
		Vollkorn_400Regular
	});
	async function loadAppData() {
		try {
			await Font.loadAsync(Ionicons.font);
			await new Promise((resolve) => setTimeout(resolve, 2000));
		} catch (e) {
			console.error(e);
		} finally {
			setIsReady(true);
		}
	}
	useEffect(() => {
		if (fontsLoaded && isReady) {
			setIsAppReady(true);
		}
	}, [fontsLoaded, isReady]);

	return [isAppReady, loadAppData];
}
