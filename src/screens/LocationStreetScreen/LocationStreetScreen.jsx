import {
	View,
	Text,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	Platform
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import SearchBar from "../../components/SearchBar/SearchBar";
import Background from "../../components/Background/Background";
import LocationConfirmButton from "./LocationStreetScreenConfirmButton";

import defaultStyles, { screenWidth, colors } from "../../styles";

export default function LocationStreetScreen({ navigation, route }) {
	const { selectedTown } = route.params;
	const [selectedStreet, setSelectedStreet] = useState("");
	const [searchText, setSearchText] = useState("");
	const [streets, setStreets] = useState([]);

	const searchTextHandler = debounce((text) => setSearchText(text));
	const selectStreetHandler = (addr) => {
		setSelectedStreet(addr);
	};

	function debounce(func, timeout = 500) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	}

	const onPressHandler = () => {};

	useEffect(() => {
		const onMountDataLoad = async () => {
			const response = await fetch(
				`https://mojemiasto-api.azurewebsites.net/api/data/addressautocomplete?dataString=${
					selectedTown + " " + searchText
				}&type=streetName`
			);
			const data = await response.json();
			setStreets(data);
		};
		if (searchText.length > 2) {
			onMountDataLoad();
		} else {
			setStreets([]);
		}
	}, [searchText]);

	return (
		<Background>
			<Image
				source={require("../../assets/img/shakehand.png")}
				resizeMode="contain"
				style={{ width: screenWidth, height: 350 }}
			/>
			<KeyboardAvoidingView behavior={"position"}>
				<SearchBar setValue={searchTextHandler} />

				<ScrollView style={[defaultStyles.locationContainer]}>
					{streets.length > 0
						? streets.map((street) => (
								<Text
									onPress={() => selectStreetHandler(street.address.street)}
									style={[
										defaultStyles.townItem,
										selectedStreet == street.address.street
											? defaultStyles.townItemFocused
											: ""
									]}
									key={street.address.street}
								>
									{street.address.street}
								</Text>
						  ))
						: null}
				</ScrollView>
			</KeyboardAvoidingView>
			{selectedStreet ? (
				<LocationConfirmButton onPress={onPressHandler} />
			) : null}
		</Background>
	);
}
