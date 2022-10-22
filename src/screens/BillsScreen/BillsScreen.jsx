import { StyleSheet, Text, View, Modal, Pressable, TextInput, KeyboardAvoidingView, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons"
import Background from  "../../components/Background/Background"
import defaultStyles, { screenWidth, colors } from "../../styles";
import style from "./styles_BillsScreen"
import { useTranslation } from "react-i18next";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uniqueId from "lodash/uniqueId";
import nearestBillImage from "../../assets/img/billNearest.png";

export default function BillsScreen() {
	
	const [isNewBillModalActive, setIsNewBillModalActive] = useState(false)
	const [billName, setBillName] = useState("")
	const [billAmount, setBillAmount] = useState("")
	const [billDate, setBillDate] = useState(new Date().getTime())
	const { t } = useTranslation();
	const addBillHandler = () => {
		setIsNewBillModalActive(true)

	}

	const saveBillHandler = async (e) => {
		e.persist()
		const dataToSave = {
			id: uniqueId(),
			name: billName,
			amount: billAmount,
			date: billDate
		}
		console.log(dataToSave)
		const bills = await AsyncStorage.getItem("bills").then(
			(bills) => {
				try {
					if (bills) {
						const billsArray = JSON.parse(bills)
						billsArray.push(dataToSave)
						AsyncStorage.setItem("bills", JSON.stringify(billsArray))
					} else {
						AsyncStorage.setItem("bills", JSON.stringify([dataToSave]))
					}
					Alert.alert(t("bills:alertSuccess"), t("bills:billAdded"))

				}
				catch (e) {
					Alert.alert(t("bills:alertError"), t("bills:billNotAdded"))
				}

			})
		
		
		setIsNewBillModalActive(false)
	}


	return (
		<Background>
			<Modal
				animationType="slide"
				transparent={true}
				avoidKeyboard={true} 
				visible={isNewBillModalActive}
				onRequestClose={() => {
					setIsNewBillModalActive(false);
				}}
				>
  
				<KeyboardAvoidingView behavior="height" style={style.modalContainer}>
					<View style={style.modalContent}>
						<View style={style.modalHr} />
						<Text style={style.modalTitle}>
							{t("bills:newBill")}
						</Text>	
						<View style={style.modalWideHr} />
						<View style={style.modalFormContainer}>
							<Text style={style.modalLabel}> 
								{t("bills:billName")}
							</Text>
							<TextInput style={style.modalInput} onChangeText={(text) =>setBillName(text)} placeholder={t("bills:billNamePlaceholder")}/>
							<Text style={style.modalLabel}>
								{t("bills:billAmount")}
							</Text>
							<TextInput style={style.modalInput} onChangeText={(text) => setBillAmount(text)}  placeholder={t("bills:billAmountPlaceholder")}/>
							<Text style={style.modalLabel}>
								{t("bills:billDate")}
							</Text>
							{
								React.useMemo(() => {
									return (
										<RNDateTimePicker
											value={new Date(billDate)}
											style={style.modalDateInput}
											onChange={(e) => {console.log(e.nativeEvent.timestamp);setBillDate(e.nativeEvent.timestamp)}}
										/>
									)
								})
							}
						</View>
						<View style={style.modalButtonContainer}>
							<Pressable style={style.modalButtonCancel} onPress={() => setIsNewBillModalActive(!isNewBillModalActive)}>
								<Text style={style.modalButtonText}>
									{t("bills:cancel")}
								</Text>
							</Pressable>
							<Pressable style={style.modalButtonAdd} onPress={(event) => saveBillHandler(event)}>	
							
								<Text style={style.modalButtonText}>
									{t("bills:add")}
								</Text>
							</Pressable>


						</View>
					</View>
				</KeyboardAvoidingView>

			</Modal>
			
			<View style={style.headerContainer}>
				<View style={style.nearestBillContainer}>
					<Text style={style.nearestBillTitle}>
						{t("bills:nearestBill")}
					</Text>
					<View style={style.nearestBillBox}>
						<Image source={nearestBillImage} />
						<View style={style.nearestBillRightSection}>

							<View style={style.nearestBillContentContainer}>
								<Text style={style.nearestBillDate}> 
									Poniedziałek
								</Text>
								<Text style={style.nearestBillDate}> 
									21.07.2020
								</Text>
							</View>
							<View style={style.nearestBillContentContainer}>
								<Text style={style.nearestBillContent}>
									Śmieci
								</Text>
								<Text style={style.nearestBillContent}>
									21,37 zł
								</Text>
							</View>
						</View>
					</View>
				</View>
			</View>

			<Pressable onPress={addBillHandler}>
				<Ionicons name="add-circle-outline" size={24} color={colors.text} />
			</Pressable>
		</Background>
	);
}
