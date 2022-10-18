import { Text, Image } from "react-native";
import Background from "../../components/Background/Background";
import { useTranslation } from "react-i18next";

import defaultStyles, { screenWidth } from "../../styles";

export default function LocationScreen({ navigation }) {
	const { t } = useTranslation();
	const onPressHandler = () => {
		console.log("next");
	};

	return (
		<Background>
			<Image
				source={require("../../assets/img/arm.png")}
				resizeMode="contain"
				style={{ width: screenWidth, height: 350 }}
			/>
			<Text style={[defaultStyles.title1]}>{t("location:title")}</Text>
			{/* <Text style={[style.subtitle]}>{t("welcome:slogan")}</Text> */}
			{/* <WelcomeButton onPress={onPressHandler} /> */}
		</Background>
	);
}
``;
