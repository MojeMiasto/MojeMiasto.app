import { SafeAreaView, View } from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import defaultStyles from "../../styles.js";
import NextWasteCard from "../../components/NextWasteCard/NextWasteCard";
import WasteCard from "../../components/WasteCard/WasteCard.jsx";
import Background from "../../components/Background/Background.jsx";
import { useEffect } from "react";

export default function WasteScreen() {
	const { t } = useTranslation();

	useEffect(() => {
		AsyncStorage.setItem("alreadyLaunched", "false");
	}, []);

	return (
		<Background>
			<SafeAreaView style={defaultStyles.wrapper}>
				<View style={{ height: 100 }} />
				<NextWasteCard
					wasteType={t("waste:type.paper")}
					wasteDate={"21.07.2019"}
				/>
				<View style={{ height: 100 }} />
				<WasteCard />
			</SafeAreaView>
		</Background>
	);
}
