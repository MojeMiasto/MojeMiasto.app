import {
	SafeAreaView,
	ScrollView,
	View,
	RefreshControl,
	Text,
	ActivityIndicator
} from "react-native";
import { useTranslation } from "react-i18next";
import Carousel from "react-native-reanimated-carousel";
import Ionicons from "@expo/vector-icons/Ionicons";

import defaultStyles, { screenWidth, colors } from "../../styles.js";
import NextWasteCard from "../../components/NextWasteCard/NextWasteCard";
import WasteCard from "../../components/WasteCard/WasteCard.jsx";
import Background from "../../components/Background/Background.jsx";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkAndUpdateScheduledWasteNotificationsAsync } from "../../notifications/notificationsRepository";
import getAddress from "../../getAddress.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AdjustFontSize } from "../../AdjustFontSize.jsx";

export default function WasteScreen() {
	const { t } = useTranslation();
	const [wasteTypes, setWasteTypes] = useState({});
	const [wasteData, setWasteData] = useState([]);
	const [userAddress, setUserAddress] = useState({});
	const [refreshing, setRefreshing] = useState(false);
	const [wasteDisplayData, setWasteDisplayData] = useState({});
	const [uniqueWaste, setUniqueWaste] = useState([]);
	const [nextWasteCardArray, setNextWasteCardArray] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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
		// setTimeout(() => {
		setRefreshing(false);
		// }, 1000);
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
		setIsLoading(false);
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
		const returnArray = [];
		wasteData.forEach((element) => {
			if (element.date === wasteData[0].date) {
				returnArray.push(
					<NextWasteCard
						wasteType={wasteTypes[element.wasteId]?.wasteName?.toUpperCase()}
						wasteDate={element.date}
						key={element.wasteId}
					/>
				);
			}
		});
		setNextWasteCardArray(returnArray);
	}, [wasteData]);

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
								tintColor={colors.accentLight}
								colors={[colors.accentLight]}
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

						<AdjustFontSize
							text={t("waste:next_waste_collection")}
							fontSize={defaultStyles.title1.fontSize}
							numberOfLines={1}
							style={[
								defaultStyles.title1,
								{ textAlign: "center", paddingRight: 16, marginBottom: 32 }
							]}
						/>

						{isLoading && (
							<ActivityIndicator size={"large"} color={colors.accentLight} />
						)}

						{nextWasteCardArray}

						<View style={{ height: 100 }} />

						<Carousel
							width={screenWidth}
							height={334}
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
							pagingEnabled={true}
							panGestureHandlerProps={{
								activeOffsetX: [-20, 20]
							}}
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
