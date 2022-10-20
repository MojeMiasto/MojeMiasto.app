import { Text, Image } from "react-native";
import Background from "../../components/Background/Background";
import { useTranslation } from "react-i18next";

import { screenWidth } from "../../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from "./styles_WelcomeScreen";
import WelcomeButton from "./WelcomeButton";
import {useEffect} from "react";
import {registerForPushNotificationsAsync} from "../../notifications/notificationsRepository";

export default function WelcomeScreen({ navigation }) {
	const { t } = useTranslation();

	useEffect(() => {
		const configure = async () => {
			const token = await registerForPushNotificationsAsync()
			AsyncStorage.setItem("notificationToken", token);
			console.log(token);
		}
		configure()
	}, [])

	const onPressHandler = () => {
		navigation.navigate("Location");
	};

	return (
		<Background>
			<Image
				source={require("../../assets/img/arm.png")}
				resizeMode="contain"
				style={{ width: screenWidth, height: 350 }}
			/>
			<Text style={[style.title]}>{t("welcome:welcomeMsg")}</Text>
			<Text style={[style.subtitle]}>{t("welcome:slogan")}</Text>
			<WelcomeButton onPress={onPressHandler} />
		</Background>
	);
}
``;
