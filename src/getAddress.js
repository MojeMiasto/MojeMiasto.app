import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function getAddress(setUserAddress) {
	try {
		const jsonValue = await AsyncStorage.getItem("userAddress");
		setUserAddress(JSON.parse(jsonValue));
	} catch (e) {
		console.error(e);
	}
}
