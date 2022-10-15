import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplash from "react-native-animated-splash-screen";

import "./src/IMLocalize";
import { colors } from "./src/styles";
import Navigator from "./src/Navigator";
import useLoadAppData from "./src/useLoadAppData";

SplashScreen.hideAsync();

export default function App() {
	const [isAppReady, loadAppData] = useLoadAppData();

	useEffect(() => {
		loadAppData();
	}, []);

	return (
		<AnimatedSplash
			translucent={true}
			isLoaded={isAppReady}
			logoImage={require("./assets/logo.png")}
			logoWidth={214}
			logoHeight={164}
			backgroundColor={colors.primaryLight}
		>
			<Navigator />
		</AnimatedSplash>
	);
}
