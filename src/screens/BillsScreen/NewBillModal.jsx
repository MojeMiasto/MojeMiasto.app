import { Text, View, Pressable, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import style from "./styles_BillsScreen";
import { useTranslation } from "react-i18next";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import GestureRecognizer from "react-native-swipe-gestures";

export default function NewBillModal(props) {
	const [isNewBillModalActive, setIsNewBillModalActive] = useState(false);
	const [billName, setBillName] = useState("");
	const [billAmount, setBillAmount] = useState("");
	const [billDate, setBillDate] = useState(new Date().getTime());
	const [isModalActive, setIsModalActive] = useState(false);
	const { t } = useTranslation();

	const resetBillData = () => {
		setBillName("");
		setBillAmount("");
		setBillDate(new Date().getTime());
	};

    useEffect(() => {
        setIsNewBillModalActive(props.isBillModalActive);
		resetBillData();
	}, [props.isBillModalActive]);

	const saveBillHandler = async (e) => {
		e.persist();
		if (billName === "" || billAmount === "") {
			Alert.alert(t("bills:alertError"), t("bills:billEmptyFields"));
			return;
		}
		if (billDate < new Date().getTime()) {
			Alert.alert(t("bills:alertError"), t("bills:billWrongDate"));
			return;
		}

		const dataToSave = {
			name: billName,
			amount: billAmount,
			date: billDate
		}

		await AsyncStorage.getItem("bills").then((bills) => {
			try {
				if (bills) {
					const billsArray = JSON.parse(bills);
					billsArray.push(dataToSave);
					AsyncStorage.setItem("bills", JSON.stringify(billsArray));
				} else {
					AsyncStorage.setItem("bills", JSON.stringify([dataToSave]));
				}
				Alert.alert(t("bills:alertSuccess"), t("bills:billAdded"));
			} catch (e) {
				Alert.alert(t("bills:alertError"), t("bills:billNotAdded"));
			}
		});

		// resetBillData()
		setIsNewBillModalActive(false)
        props.hideModal()

        }
	function DatePicker(){
			return (
				<RNDateTimePicker
					value={new Date(billDate)}
					style={style.modalDateInput}
					onChange={(e) => {console.log(e.nativeEvent.timestamp);setBillDate(e.nativeEvent.timestamp)}}
				/>
			)
	}
    return (
			<GestureRecognizer
				onSwipeDown={() => setIsNewBillModalActive(false)}

			>
				<Modal

					transparent={true}

					avoidKeyboard={true}
					isVisible={isNewBillModalActive}
					backdropOpacity={0.3}
					hasBackdrop={true}
					animationIn="slideInUp"
					animationInTiming={750}
					animationOut="slideOutDown"
					animationOutTiming={750}
					useNativeDriver={true}
					swipeDirection="down"

					onBackButtonPress={() => {
						setIsNewBillModalActive(false)
						props.hideModal()
					}}
					onBackdropPress={() => {
						setIsNewBillModalActive(false)
						props.hideModal()
					}}
					onSwipeComplete={() => {
						setIsNewBillModalActive(false)
						props.hideModal()
					}}
					onModalShow={() => {
						console.log("Modal is visible")
						setIsModalActive(true)
					}
					}

					>

					<View style={style.modalContainer}>
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
									isModalActive ? <DatePicker /> : null
								}
							</View>
							<View style={style.modalButtonContainer}>
								<Pressable style={style.modalButtonCancel} onPress={() => {setIsNewBillModalActive(false);         props.hideModal()}}>
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
					</View>

				</Modal>
			</GestureRecognizer>

  )
}

