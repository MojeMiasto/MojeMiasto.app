import {
	View,
	Text,
	ScrollView,
	ActivityIndicator,
	RefreshControl
} from "react-native";
import Background from "../../components/Background/Background.jsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import defaultStyles, { colors } from "../../styles.js";
import PollutionStationCard from "../../components/PollutionStationCard/PollutionStationCard.jsx";
import getAddress from "../../getAddress.js";
import PollutionCard from "../../components/PollutionCard/PollutionCard.jsx";

export default function PollutionScreen() {
	const { t } = useTranslation();
	const [stationData, setStationData] = useState({});
	const [userAddress, setUserAddress] = useState({});
	const [pollutionData, setPollutionData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	const refreshPollutionData = async () => {
		setRefreshing(true);
		await fetchPollutionData();
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	};

	const fetchPollutionData = async () => {
		const response = await fetch(
			`https://mojemiasto-api.azurewebsites.net/api/pollution/pollutionData?geoLat=${userAddress.point.coordinates[1]}&geoLong=${userAddress.point.coordinates[0]}`
		);
		const data = await response.json();
		setPollutionData(data[0].stationData);
		setStationData(data[0].stationInfo);
		setIsLoading(false);
	};

	useEffect(() => {
		const a = async () => {
			await getAddress(setUserAddress);
		};
		a();
	}, []);

	useEffect(() => {
		if (Object.keys(userAddress).length > 0) {
			fetchPollutionData();
		}
	}, [userAddress]);

	return (
		<Background>
			<View style={{ height: 48 }} />
			<PollutionStationCard stationData={stationData} />
			<View style={{ height: 64 }} />
			<Text style={defaultStyles.title1}>{t("pollution:pollution_area")}</Text>
			<View style={{ height: 8 }} />
			<ScrollView
				refreshControl={
					<RefreshControl
						tintColor={colors.accentLight}
						colors={[colors.accentLight]}
						refreshing={refreshing}
						onRefresh={refreshPollutionData}
					/>
				}
			>
				{isLoading && (
					<ActivityIndicator size={"large"} color={colors.accentLight} />
				)}
				{stationData.stationIndex && (
					<PollutionCard
						data={stationData.stationIndex}
						name={t("pollution:pollution")}
						air
					/>
				)}
				{
					stationData.stationIndex && (pollutionData.map((element) =>
						(
							<PollutionCard
								data={element?.sensorData}
								name={element?.sensorName}
							/>
						)))
				}
			</ScrollView>
		</Background>
	);
}
