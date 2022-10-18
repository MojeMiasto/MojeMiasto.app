import { View, Text, Image} from 'react-native'
import React from 'react'
import { useTranslation } from "react-i18next";

import Background from '../../components/Background/Background';
import { screenWidth } from "../../styles";

export default function LocationStreetScreen() {
  return (
		<Background>
			<Image
				source={require("../../assets/img/shakehand.png")}
				resizeMode="contain"
				style={{ width: screenWidth, height: 350 }}
			/>
			{/* <Text style={[defaultStyles.title1]}>{t("location:title")}</Text>
			
			<LocationContainer />

			<LocationConfirmButton onPress={onPressHandler} /> */}


		</Background>
	);
}

 LocationStreetScreen