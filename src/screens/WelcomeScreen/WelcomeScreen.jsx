import { Text, Image } from "react-native";
import Background from "../../components/Background/Background";
import { useTranslation } from "react-i18next";

import { screenWidth } from "../../styles";

import style from "./styles_WelcomeScreen";
import WelcomeButton from "./WelcomeButton";

export default function WelcomeScreen({ navigation }) {
	const { t } = useTranslation();
	return (
		<Background>
			<Image
				source={require("../../assets/img/arm.png")}
				resizeMode="contain"
				style={{ width: screenWidth, height: 350 }}
			/>
			<Text style={[style.title]}>{t("welcome:welcomeMsg")}</Text>
			<Text style={[style.subtitle]}>{t("welcome:slogan")}</Text>
			<WelcomeButton />
		</Background>
	);
}
