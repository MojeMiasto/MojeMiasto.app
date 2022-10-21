import {
	SafeAreaView,
	ScrollView,
	View,
	RefreshControl,
	Text
} from "react-native";
import { useTranslation } from "react-i18next";
import Carousel from "react-native-reanimated-carousel";
import Ionicons from "@expo/vector-icons/Ionicons";

import defaultStyles, { screenWidth } from "../../styles.js";
import NextWasteCard from "../../components/NextWasteCard/NextWasteCard";
import WasteCard from "../../components/WasteCard/WasteCard.jsx";
import Background from "../../components/Background/Background.jsx";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAndUpdateScheduledWasteNotificationsAsync } from "../../notifications/notificationsRepository";
import getAddress from "../../getAddress.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function WasteScreen() {
	const { t } = useTranslation();
	const [wasteTypes, setWasteTypes] = useState({});
	const [wasteData, setWasteData] = useState([]);
	const [userAddress, setUserAddress] = useState({});
	const [refreshing, setRefreshing] = useState(false);
	const [wasteDisplayData, setWasteDisplayData] = useState({});
	const [uniqueWaste, setUniqueWaste] = useState([]);
	const [nextWasteString, setNextWasteString] = useState("");

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

		const uniqueWasteTypes = [
			...new Set(data.wasteList.map((item) => item.wasteId))
		].sort();
		setUniqueWaste(uniqueWasteTypes);

		const wasteDisplayData = uniqueWasteTypes
			.map((id) =>
				data.wasteList.map((item) => (item.wasteId == id ? item : null))
			)
			.map((item) => item.filter((item) => item != null))
			.reduce((acc, cur, i) => {
				acc[uniqueWasteTypes[i]] = cur;
				return acc;
			}, {});
		setWasteDisplayData(wasteDisplayData);
	};

	useEffect(() => {
		const a = async () => {
			await getWasteTypes();
			await getAddress(setUserAddress);
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
	useEffect(() => {
		let returnString = "";
		wasteData.forEach(element => {
			if (element.date === wasteData[0].date) returnString += wasteTypes[
				element.wasteId
				]?.wasteName?.toUpperCase()+", "
		});
		console.log(returnString);
		setNextWasteString(returnString);
	}, [wasteData])

	useEffect(() => {
		checkAndUpdateScheduledWasteNotificationsAsync(wasteData);
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Background>
				<SafeAreaView style={defaultStyles.wrapper}>
					<ScrollView
						style={{ flex: 1, width: screenWidth, paddingLeft: 16 }}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={refreshWasteData}
							/>
						}
					>
						<View style={{ height: 24 }} />
						<Text
							style={[
								defaultStyles.location,
								{ textAlign: "center", paddingRight: 16 }
							]}
						>
							{userAddress?.address?.street} {userAddress?.address?.houseNumber}
							, {userAddress?.address?.city}{" "}
							<Ionicons name="chevron-down-outline" size={16} />
						</Text>
						<View style={{ height: 48 }} />
						<Text
							style={[
								defaultStyles.title1,
								{ textAlign: "center", paddingRight: 16, marginBottom: 32 }
							]}
						>
							{t("waste:next_waste_collection")}
						</Text>
						<NextWasteCard
							wasteType={nextWasteString}
							wasteDate={wasteData[0]?.date}
						/>
						<View style={{ height: 100 }} />

						<Carousel
							width={screenWidth}
							height={450}
							data={uniqueWaste}
							loop={false}
							mode={"horizontal-stack"}
							modeConfig={{
								snapDirection: "left",
								stackInterval: 18,
								showLength: 3,
								opacityInterval: 0.5,
								rotateZDeg: 10
							}}
							windowSize={3}
							pagingEnabled={true}
							renderItem={({ index }) => {
								return (
									<WasteCard
										wasteData={wasteDisplayData[uniqueWaste[index]]}
										wasteTypes={wasteTypes}
										key={index}
									/>
								);
							}}
						/>
					</ScrollView>
				</SafeAreaView>
			</Background>
		</GestureHandlerRootView>
	);
}
