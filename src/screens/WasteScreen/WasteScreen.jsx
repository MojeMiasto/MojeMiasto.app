import { SafeAreaView, ScrollView, View, RefreshControl } from "react-native";
import { useTranslation } from "react-i18next";

import defaultStyles from "../../styles.js";
import NextWasteCard from "../../components/NextWasteCard/NextWasteCard";
import WasteCard from "../../components/WasteCard/WasteCard.jsx";
import Background from "../../components/Background/Background.jsx";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WasteScreen() {
	const { t } = useTranslation();
	const [wasteTypes, setWasteTypes] = useState({});
	const [wasteData, setWasteData] = useState([]);
	const [userAddress, setUserAddress] = useState({});
	const [refreshing, setRefreshing] = useState(false);

	const getAddress = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("userAddress");
			setUserAddress(JSON.parse(jsonValue));
		} catch (e) {
			console.error(e);
		}
	};

	const getWasteTypes = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("wasteTypes");
			setWasteTypes(JSON.parse(jsonValue));
		} catch (e) {
			console.error(e);
		}
	};

	const refreshWasteData = async () => {
		setRefreshing(true);
		await fetchWasteData();
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	};

	const fetchWasteData = async () => {
		const response = await fetch(
			`https://mojemiasto-api.azurewebsites.net/api/waste/wasteList?city=${userAddress.address.city}&streetName=${userAddress.address.street}&houseNumber=${userAddress.address.houseNumber}`
		);
		const data = await response.json();
		setWasteData(data.wasteList);
	};

	useEffect(() => {
		const a = async () => {
			await getWasteTypes();
			await getAddress();
		};
		a();
	}, []);

	useEffect(() => {
		if (
			Object.keys(userAddress).length > 0 &&
			Object.keys(wasteTypes).length > 0
		) {
			fetchWasteData();
		}
	}, [wasteTypes, userAddress]);

	return (
		<Background>
			<SafeAreaView style={defaultStyles.wrapper}>
				<ScrollView
					style={{ flex: 1, width: "100%" }}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={refreshWasteData}
						/>
					}
				>
					<View style={{ height: 100 }} />
					<NextWasteCard
						wasteType={wasteTypes[
							wasteData[0]?.wasteId
						]?.wasteName?.toUpperCase()}
						wasteDate={wasteData[0]?.date}
					/>
					<View style={{ height: 100 }} />
					{wasteData.map((waste, index) => {
						return <WasteCard wasteData={waste} wasteTypes={wasteTypes} />;
					})}
				</ScrollView>
			</SafeAreaView>
		</Background>
	);
}
