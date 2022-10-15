import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplash from "react-native-animated-splash-screen";

import "./src/IMLocalize";
import { colors } from "./src/styles";
import Navigator from "./src/Navigator";
import useLoadAppData from "./src/useLoadAppData";

export default function App() {
	const [isAppReady, loadAppData] = useLoadAppData();
	const [isSplashReady, setSplashReady] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setSplashReady(true);
		}, 3000);
	}, [isAppReady]);

	useEffect(() => {
		loadAppData();
	}, []);
	if (!isAppReady)
		return (
			<AnimatedSplash
				translucent={true}
				isLoaded={false}
				logoImage={require("./assets/logo.png")}
				logoWidth={214}
				logoHeight={164}
				backgroundColor={colors.primaryLight}
			></AnimatedSplash>
		);
	return (
		<AnimatedSplash
			translucent={true}
			isLoaded={isSplashReady}
			logoImage={require("./assets/logo.png")}
			logoWidth={214}
			logoHeight={164}
			backgroundColor={colors.primaryLight}
		>
			<Navigator />
		</AnimatedSplash>
	);
}
