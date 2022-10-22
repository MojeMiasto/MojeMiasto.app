import {  Text, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons"
import Background from  "../../components/Background/Background"
import styles, { colors } from "../../styles";
import style from "./styles_BillsScreen"
import { useTranslation } from "react-i18next";
import NewBillModal from "./NewBillModal";
import BillContainer from "./BillContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";


export default function BillsScreen() {
	const [isModalActive, setIsModalActive] = useState(false)
	const [bills, setBills] = useState([])
	const { t } = useTranslation();
	const getBills = async () => {
		await AsyncStorage.getItem("bills").then(
			(bills) => {
				try {
					if (bills) {
						const billsArray = JSON.parse(bills)
						billsArray.sort((a, b) => a.date - b.date)
						nearestBill = billsArray[0]
						setBills(billsArray)
					}
				}
				catch (e) {
					return false
				}
			})
	}

	useEffect(() => {
		getBills()
	}, [bills])

	let nearestBill = {}
	if(bills !== undefined && bills.length > 0) {
		nearestBill = bills[0]
		bills.shift()
	}

	return (
		<Background>
			{bills.length > 0 ? 
			<View>
				<NewBillModal isBillModalActive={isModalActive} hideModal={() => setIsModalActive(false)}/>
			
				<View style={style.headerContainer}>
					<View style={style.BillContainer}>
						<Text style={style.BillTitle}>
							{t("bills:nearestBill")}
						</Text>
						<BillContainer 
							bill={nearestBill}
							image={1}
						/>
						
					</View>
					<View style={style.otherBillData}>
						<Text style={style.BillTitle}>
							{t("bills:allBills")}
							<Pressable onPress={() => setIsModalActive(true)}>
								<Ionicons name="add-circle-outline" size={24} color={colors.text}  style={styles.icon}  />
							</Pressable>
						</Text>
						<ScrollView style={styles.scrollableBillsView}>
							{bills.map((bill) => {
									return (
										<BillContainer
											bill={bill}
											image={2}
										/>
									)
								
							})}
						</ScrollView>
					</View>
				</View>		
			</View>
			:<View style={style.NoBillContainer}>
				<Text style={style.BillTitle}>{t("bills:noBills")}</Text>
				<Text style={style.BillTitle}>{t("bills:clickToAdd")}</Text>
				<Pressable onPress={() => setIsModalActive(true)}>
					<Ionicons name="add-circle-outline" size={24} color={colors.text} style={styles.icon} />
				</Pressable>
			</View>
			
		}
		</Background>
	);
}
