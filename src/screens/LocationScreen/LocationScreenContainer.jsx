import { View, ScrollView, Text, TouchableWithoutFeedback } from "react-native";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

import defaultStyles, { screenWidth } from "../../styles";

export default function LocatonScreen({ setSelected }) {
	const { t } = useTranslation();
	const [selectedTown, setSelectedTown] = useState("");
	const [towns, setTowns] = useState([]);

	useEffect(() => {
		setSelected(selectedTown);
	}, [selectedTown]);

	useEffect(() => {
		const onMountDataLoad = async () => {
			const response = await fetch(
				"https://mojemiasto-api.azurewebsites.net/api/data/entities?topic=cities"
			);
			const data = await response.json();
			setTowns(data.returnList);
		};
		onMountDataLoad();
	}, []);

	const handleSelectingTown = (el) => {
		setSelectedTown(el);
	}; 
	return (
		<View style={[defaultStyles.locationContainer]}>
			<Text style={[defaultStyles.header]}>{t("location:header")}</Text>
			<View style={[defaultStyles.hr]}></View>
			<ScrollView>
				{towns
					? towns.map((el) => (
						<TouchableWithoutFeedback onPress={() => handleSelectingTown(el)}>
							<Text
								key={el}
								style={[
									defaultStyles.townItem,
									selectedTown == el ? defaultStyles.townItemFocused : ""
								]}
							>
								{el}
							</Text>
						</TouchableWithoutFeedback>
					  ))
					: null}
			</ScrollView>
		</View>
	);
}
