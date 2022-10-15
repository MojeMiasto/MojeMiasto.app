import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";

export default function useLoadAppData() {
	const [isReady, setIsReady] = useState(false);
	const [isAppReady, setIsAppReady] = useState(false);

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

	return [isAppReady, loadAppData];
}
