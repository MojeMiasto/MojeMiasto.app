
import { View, ScrollView, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import defaultStyles, { screenWidth } from "../../styles";

export default function LocatonScreen() {
	const { t } = useTranslation();
	const [selectedTown, setselectedTown] = useState("")

    const towns_temp = [
		{name: "Dąbrowa Górnicza"},
		{name: "Małogoszcz"},
		{name: "Myszków"},
		{name: "Sosnowiec"},
	]


    const handleSelectingTown = (el) => {
		setselectedTown(el.name)
	}
	return (
		<View style={[defaultStyles.locationContainer]}>
            <Text style={[defaultStyles.header]}>{t("location:header")}</Text>
            <View style={[defaultStyles.hr]}></View>
            <ScrollView>
                {
                    towns_temp.map(el => 
                        
                        <Text key={el.name} onPress={() => handleSelectingTown(el)} style={[defaultStyles.townItem, selectedTown == el.name ? defaultStyles.townItemFocused : ""]}>{el.name}</Text> 
                        
                    )
                }
            </ScrollView>
        </View>
	);
}



