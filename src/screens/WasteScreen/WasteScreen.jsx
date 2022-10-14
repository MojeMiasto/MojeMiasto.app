import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import defaultStyles, { colors } from "../../../styles.js";
import NextWasteCard from "../../components/NextWasteCard/NextWasteCard";
import WasteCard from "../../components/WasteCard/WasteCard.jsx";

export default function WasteScreen() {
	const { t } = useTranslation();

	return (
		<>
			<LinearGradient
				colors={[colors.primaryLight, colors.primaryDark]}
				start={{ x: 1, y: 0 }}
				style={defaultStyles.background}
			/>
			<SafeAreaView style={defaultStyles.wrapper}>
				<View style={{ height: 100 }} />
				<NextWasteCard
					wasteType={t("waste:type.paper")}
					wasteDate={"21.07.2019"}
				/>
				<View style={{ height: 100 }} />
				<WasteCard />
			</SafeAreaView>
		</>
	);
}
