import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useLoadAppData() {
	const [isReady, setIsReady] = useState(false);
	const [isAppReady, setIsAppReady] = useState(false);
	const [isFirstLaunch, setIsFirstLaunch] = useState(null);

	async function loadWasteTypes() {
		const wastedata = await fetch(
			"https://mojemiasto-api.azurewebsites.net/api/data/entities?topic=waste"
		);
		const data = await wastedata.json();
		await AsyncStorage.setItem("wasteTypes", JSON.stringify(data));
	}

	async function loadFailureTypes() {
		const failuredata = await fetch(
			"https://mojemiasto-api.azurewebsites.net/api/data/entities?topic=failure_type"
		);
		const data = await failuredata.json();
		await AsyncStorage.setItem("failureTypes", JSON.stringify(data));
	}

	async function loadFailureCategories() {
		const failuredata = await fetch(
			"https://mojemiasto-api.azurewebsites.net/api/data/entities?topic=failure_category"
		);
		const data = await failuredata.json();
		await AsyncStorage.setItem("failureCategories", JSON.stringify(data));
	}

	async function loadAppData() {
		try {
			await Font.loadAsync({
				Poppins_300: require("./assets/fonts/Poppins-Light.ttf"),
				Poppins_400: require("./assets/fonts/Poppins-Regular.ttf"),
				Poppins_500: require("./assets/fonts/Poppins-Bold.ttf"),
				Vollkorn_400: require("./assets/fonts/Vollkorn-Regular.ttf")
			});
			await Font.loadAsync(Ionicons.font);
			await Font.loadAsync(Feather.font);
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
				await loadWasteTypes();
				await loadFailureTypes();
				await loadFailureCategories();

				if (value == null || value == "false") {
					await AsyncStorage.setItem("alreadyLaunched", "true");
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
