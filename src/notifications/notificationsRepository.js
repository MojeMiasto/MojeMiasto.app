import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import {Platform} from "react-native";
import {messageModel} from './wasteNotificationModel'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {cancelAllScheduledNotificationsAsync} from "expo-notifications";
import moment from "moment";

export async function sendPushNotification(model) {

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    });
}

export async function scheduleNotificationAsync(model, sendDate) {
    const trigger = new Date(sendDate)
    await Notifications.scheduleNotificationAsync({
        content: model,
        trigger
    });
}

export async function checkAndUpdateScheduledWasteNotificationsAsync(wasteList){
    wasteList = wasteList.slice(0, 10);
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    for (const element of wasteList) {
        try{
            const isScheduled = scheduledNotifications.find(element1 => element.date === element1.content.data.date && element.wasteId === element1.content.data.wasteId)
            if (!isScheduled){
                const wasteTypes = JSON.parse(await AsyncStorage.getItem("wasteTypes"));
                const message = messageModel(element.date, wasteTypes[element.wasteId].wasteName, element);
                const sendDate = moment(element.date).subtract(1, 'days').hour(17).minute(0).seconds(0);
                await scheduleNotificationAsync(message, sendDate)
            }
        }catch (e) {
            console.log('not waste notification')
        }
    }
    //await cancelAllScheduledNotificationsAsync()
    console.log(await Notifications.getAllScheduledNotificationsAsync())
}

export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
