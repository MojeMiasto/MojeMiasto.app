import { View, Text, ScrollView } from "react-native";
import Background from "../../components/Background/Background.jsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import defaultStyles from "../../styles.js";
import PollutionStationCard from "../../components/PollutionStationCard/PollutionStationCard.jsx";
import getAddress from "../../getAddress.js";
import PollutionCard from "../../components/PollutionCard/PollutionCard.jsx";

export default function PollutionScreen() {
	const { t } = useTranslation();
	const [stationData, setStationData] = useState({});
	const [userAddress, setUserAddress] = useState({});
	const [pollutionData, setPollutionData] = useState({});

	const fetchPollutionData = async () => {
		const response = await fetch(
			`https://mojemiasto-api.azurewebsites.net/api/pollution/pollutionInfo?geoLat=${userAddress.point.coordinates[1]}&geoLong=${userAddress.point.coordinates[0]}`
		);
		const data = await response.json();
		setPollutionData(data[0].stationData);
		setStationData(data[0].stationInfo);
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
			<ScrollView>
				{pollutionData.stSourceDataDate && (
					<PollutionCard
						indexLevel={pollutionData.stIndexLevel}
						sourceDataDate={pollutionData.stSourceDataDate}
						name={t("pollution:pollution")}
						air
					/>
				)}
				{pollutionData.so2SourceDataDate && (
					<PollutionCard
						indexLevel={pollutionData.so2IndexLevel}
						sourceDataDate={pollutionData.so2SourceDataDate}
						name={t("pollution:so2")}
					/>
				)}
				{pollutionData.no2SourceDataDate && (
					<PollutionCard
						indexLevel={pollutionData.no2IndexLevel}
						sourceDataDate={pollutionData.no2SourceDataDate}
						name={t("pollution:no2")}
					/>
				)}
				{pollutionData.pm10SourceDataDate && (
					<PollutionCard
						indexLevel={pollutionData.pm10IndexLevel}
						sourceDataDate={pollutionData.pm10SourceDataDate}
						name={t("pollution:pm10")}
					/>
				)}
				{pollutionData.pm25SourceDataDate && (
					<PollutionCard
						indexLevel={pollutionData.pm25IndexLevel}
						sourceDataDate={pollutionData.pm25SourceDataDate}
						name={t("pollution:pm25")}
					/>
				)}
				{pollutionData.o3SourceDataDate && (
					<PollutionCard
						indexLevel={pollutionData.o3IndexLevel}
						sourceDataDate={pollutionData.o3SourceDataDate}
						name={t("pollution:o3")}
					/>
				)}
			</ScrollView>
		</Background>
	);
}
