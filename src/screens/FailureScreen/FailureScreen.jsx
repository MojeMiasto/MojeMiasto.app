import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	RefreshControl
} from "react-native";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

import defaultStyles, { colors, screenWidth } from "../../styles";
import Background from "../../components/Background/Background";
import getAddress from "../../getAddress";
import FailureCard from "../../components/FailureCard/FailureCard";

export default function FailureScreen() {
	const { t } = useTranslation();
	const [failureTypes, setFailureTypes] = useState({});
	const [failureCategories, setFailureCategories] = useState({});
	const [userAddress, setUserAddress] = useState({});
	const [refreshing, setRefreshing] = useState(false);
	const [failureData, setFailureData] = useState([]);

	const refreshFailureData = async () => {
		setRefreshing(true);
		await fetchFailureData();
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	};

	const fetchFailureData = async () => {
		const response = await fetch(
			`https://mojemiasto-api.azurewebsites.net/api/failure/failureList?city=${userAddress.address.city}&streetName=${userAddress.address.street}&houseNumber=${userAddress.address.houseNumber}`
		);
		const data = await response.json();
		setFailureData(data);
	};

	const loadFailureTypes = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("failureTypes");
			setFailureTypes(JSON.parse(jsonValue));
		} catch (e) {
			console.error(e);
		}
	};

	const loadFailureCategories = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("failureCategories");
			setFailureCategories(JSON.parse(jsonValue));
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		const a = async () => {
			await loadFailureTypes();
			await loadFailureCategories();
			await getAddress(setUserAddress);
		};
		a();
	}, []);

	useEffect(() => {
		if (
			Object.keys(userAddress).length > 0 &&
			Object.keys(failureTypes).length > 0 &&
			Object.keys(failureCategories).length > 0
		) {
			fetchFailureData();
		}
	}, [failureTypes, failureCategories, userAddress]);

	return (
		<Background>
			<SafeAreaView style={defaultStyles.wrapper}>
				<ScrollView
					style={{ flex: 1, width: screenWidth, paddingHorizontal: 16 }}
					refreshControl={
						<RefreshControl
							tintColor={colors.accentLight}
							colors={[colors.accentLight]}
							refreshing={refreshing}
							onRefresh={refreshFailureData}
						/>
					}
				>
					<View style={{ height: 24 }} />

					<Text style={[defaultStyles.location, { textAlign: "center" }]}>
						{userAddress?.address?.street} {userAddress?.address?.houseNumber},{" "}
						{userAddress?.address?.city}{" "}
						<Ionicons name="chevron-down-outline" size={16} />
					</Text>

					<View style={{ height: 48 }} />

					<Text style={[defaultStyles.title1, { textAlign: "center" }]}>
						{t("failure:title")}
					</Text>

					<View style={{ height: 16 }} />

					{failureData.length === 0 ? (
						<>
							<View style={{ height: 32 }} />
							<Text style={[defaultStyles.subtitle, { textAlign: "center" }]}>
								{t("failure:empty")}
							</Text>
						</>
					) : null}

					{failureData.map((element) => {
						return (
							<FailureCard
								key={element.message}
								isElectricity={element.failureType == 0}
								startDate={element.startDate}
								endDate={element.endDate}
								message={element.message}
								failureType={failureTypes[element.failureType]}
								failureCategory={failureCategories[element.failureCategory]}
							/>
						);
					})}
				</ScrollView>
			</SafeAreaView>
		</Background>
	);
}
