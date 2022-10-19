import { View, Text, Image, ScrollView } from "react-native";
import Background from "../../components/Background/Background";
import LocationContainer from "./LocationScreenContainer";
import LocationConfirmButton from "./LocationScreenConfirmButton";
import { useTranslation } from "react-i18next";
import defaultStyles, { screenWidth } from "../../styles";
import { useState, useEffect } from "react";

export default function LocationScreen({ navigation }) {
	const [selectedTown, setSelectedTown] = useState("");
	const { t } = useTranslation();
	const onPressHandler = () => {
		navigation.navigate("Location_street", { selectedTown });
	};

	return (
		<Background>
			<Image
				source={require("../../assets/img/shakehand.png")}
				resizeMode="contain"
				style={{ width: screenWidth, height: 350 }}
			/>
			<Text style={[defaultStyles.title1]}>{t("location:title")}</Text>

			<LocationContainer setSelected={setSelectedTown} />

			{selectedTown ? <LocationConfirmButton onPress={onPressHandler} /> : null}
		</Background>
	);
}
``;
