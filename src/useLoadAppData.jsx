import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useLoadAppData() {
	const [isReady, setIsReady] = useState(false);
	const [isAppReady, setIsAppReady] = useState(false);
	const [isFirstLaunch, setIsFirstLaunch] = useState(null);

	async function loadAppData() {
		try {
			await Font.loadAsync({
				Poppins_300: require("./assets/fonts/Poppins-Light.ttf"),
				Poppins_400: require("./assets/fonts/Poppins-Regular.ttf"),
				Poppins_500: require("./assets/fonts/Poppins-Bold.ttf"),
				Vollkorn_400: require("./assets/fonts/Vollkorn-Regular.ttf")
			});
			await Font.loadAsync(Ionicons.font);
			await new Promise((resolve) => setTimeout(resolve, 2000));
		} catch (e) {
			console.error(e);
		} finally {
			setIsReady(true);
		}
	}
	useEffect(() => {
		if (isReady) {
			setIsAppReady(true);
		}
	}, [isReady]);
	useEffect(() => {
		const a = async () => {
			await AsyncStorage.getItem("alreadyLaunched").then(async (value) => {
				if (value == null || value == "false") {
					await AsyncStorage.setItem("alreadyLaunched", "true");

					const wastedata = await fetch(
						"https://mojemiasto-api.azurewebsites.net/api/data/entities?topic=waste"
					);
					const data = await wastedata.json();
					await AsyncStorage.setItem("wasteTypes", JSON.stringify(data));

					setIsFirstLaunch(true);
					console.log("First launch");
				} else {
					setIsFirstLaunch(false);
					console.log("App already launched");
				}
			});
		};
		a();
		// setIsFirstLaunch(true);
	}, []);

	return [isAppReady, loadAppData, isFirstLaunch];
}
