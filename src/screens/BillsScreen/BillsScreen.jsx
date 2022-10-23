import {  Text, View, Pressable, Image, Alert } from "react-native";
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
	const [nearestBill, setNearestBill] = useState([])
	const { t } = useTranslation();

	const getBills = async () => {

		await AsyncStorage.getItem("bills").then(
			(bills) => {
				// console.log(bills)
				try {
					if (bills) {
						const billsArray = JSON.parse(bills)
						billsArray.sort((a, b) => a.date - b.date)
						
						billsArray.forEach((bill) => {
							if (bill.date < new Date().getTime()) {
								console.log("old")
								billsArray.shift()
								AsyncStorage.setItem("bills", JSON.stringify(billsArray))
								Alert.alert(t("bills:alertSuccess"), t("bills:billDeleted"))
							}
						})
 
						setNearestBill(billsArray[0])
						billsArray.shift()
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
	}, [ isModalActive ])

	useEffect(() => {
		getBills()
	}, [])

	
	
	return (
		<Background>
			<NewBillModal isBillModalActive={isModalActive} hideModal={() => setIsModalActive(false)}/>
			{bills.length > 0 || nearestBill != null ? 
			<View style={styles.containerBlur}>
				{isModalActive ?  <View style={style.containerBlur}>

				</View>
				: null}
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
						</Text>
						<Pressable onPress={() => setIsModalActive(true)}>
							<Ionicons name="add-circle-outline" size={24} color={colors.text}   />
						</Pressable>
						<ScrollView style={style.scrollableBillsView}>
							{bills.map((bill) => {
									return (
										<View>
											<BillContainer
												key={bill.name}
												bill={bill}
												image={2}
											/>
										</View>
									)
								
							})}
						</ScrollView>
					</View>
				</View>		
			</View>
			:
			<View style={style.NoBillContainer}>
				<Text style={style.BillTitle}>{t("bills:noBills")} </Text>
				<Pressable onPress={() => {setIsModalActive(true)}}>
					<Ionicons name="add-circle-outline" size={24} color={colors.text} />
				</Pressable>

			</View>
			
		}
		</Background>
	);
}
