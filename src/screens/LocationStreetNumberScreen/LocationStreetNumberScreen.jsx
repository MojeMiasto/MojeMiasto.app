import { Text, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SearchBar from "../../components/SearchBar/SearchBar";
import Background from "../../components/Background/Background";
import LocationConfirmButton from "./LocationStreetNumberScreenConfirmButton";

import defaultStyles, { screenWidth } from "../../styles";
import { t } from "i18next";
import {registerForNotificatons} from "../../notifications/notificationsRepository";

export default function LocationStreetNumberScreen({ navigation, route }) {
	const { selectedTown, selectedStreet } = route.params;
	const [selectedNumber, setSelectedNumber] = useState("");
	const [searchText, setSearchText] = useState("");
	const [numbers, setNumbers] = useState([]);

	const searchTextHandler = debounce((text) => setSearchText(text));
	const selectStreetHandler = (addr) => {
		setSelectedNumber(addr);
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

	const onPressHandler = async () => {
		const address = numbers.filter(
			(addr) => addr.address.houseNumber === selectedNumber
		);
		const addressJSON = JSON.stringify(address[0]);
		try {
			await AsyncStorage.setItem("userAddress", addressJSON);
			const token = await AsyncStorage.getItem("notificationToken");
			registerForNotificatons(token, address[0].address.city, address[0].address.street, address[0].address.houseNumber);
		} catch (e) {
			console.error(e);
		} finally {
			// navigation
			AsyncStorage.setItem("alreadyLaunched", "true");
			console.log("Address saved");
			navigation.navigate("App");
		}
	};

	useEffect(() => {
		const onMountDataLoad = async () => {
			const response = await fetch(
				`https://mojemiasto-api.azurewebsites.net/api/data/addressautocomplete?dataString=${
					selectedTown + " " + selectedStreet + " " + searchText
				}&type=houseNumber`
			);
			const data = await response.json();
			setNumbers(data);
		};
		if (searchText.length > 0) {
			onMountDataLoad();
		} else {
			setNumbers([]);
		}
	}, [searchText]);

	return (
		<Background>
			<Image
				source={require("../../assets/img/shakehand.png")}
				resizeMode="contain"
				style={{ width: screenWidth, height: 250 }}
			/>
			<KeyboardAvoidingView behavior={"position"}>
				<SearchBar
					setValue={searchTextHandler}
					placeholder={t("location:searchNumber")}
				/>

				<ScrollView style={[defaultStyles.locationContainer]}>
					{numbers.length > 0
						? numbers.map((street) => (
								<Text
									onPress={() =>
										selectStreetHandler(street.address.houseNumber)
									}
									style={[
										defaultStyles.townItem,
										selectedNumber == street.address.houseNumber
											? defaultStyles.townItemFocused
											: ""
									]}
									key={street.address.houseNumber}
								>
									{street.address.street} {street.address.houseNumber},{" "}
									{street.address.city}
								</Text>
						  ))
						: null}
				</ScrollView>
			</KeyboardAvoidingView>
			{selectedNumber ? (
				<LocationConfirmButton onPress={onPressHandler} />
			) : null}
		</Background>
	);
}
