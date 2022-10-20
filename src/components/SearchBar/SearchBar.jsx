import { View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import styles from "./styles_SearchBar";
import { colors } from "../../styles";

export default function SearchBar({ setValue, placeholder }) {
	const { t } = useTranslation();
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		setValue(searchText);
	}, [searchText]);

	const searchTextHandler = (text) => {
		setSearchText(text);
	};

	return (
		<View style={[styles.container]}>
			<Ionicons
				name="ios-search-outline"
				size={32}
				color={colors.text}
				style={{ marginRight: 16 }}
			/>
			<TextInput
				placeholder={placeholder}
				style={[styles.textInput]}
				clearButtonMode="while-editing"
				placeholderTextColor={"#8AA38E"}
				value={searchText}
				onChangeText={searchTextHandler}
			/>
		</View>
	);
}
