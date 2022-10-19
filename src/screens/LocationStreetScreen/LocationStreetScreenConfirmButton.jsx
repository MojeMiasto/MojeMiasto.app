import React from "react";
import { Pressable, Text } from "react-native";
import { useTranslation } from "react-i18next";
import Ionicons from "@expo/vector-icons/Ionicons";

import { colors } from "../../styles";
import style from "./styles_LocationStreetScreen";

export default function LocationStreetConfirmButton({ onPress }) {
	const { t } = useTranslation();

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => {
				return [
					{
						backgroundColor: pressed ? colors.accentLight : colors.accentDark
					},
					style.button_wrapper
				];
			}}
		>
			<Text style={style.button_title}>{t("location:forwards")}</Text>
			<Ionicons name="ios-arrow-forward" size={32} color={colors.text} />
		</Pressable>
	);
}
