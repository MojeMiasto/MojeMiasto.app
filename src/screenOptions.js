import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

export const screenOptions = ({ route }) => ({
	headerShown: false,
	animation: "slide_from_right",
	tabBarIcon: ({ focused, color }) => {
		let iconName;

		if (route.name === "Waste") {
			iconName = focused ? "ios-trash" : "ios-trash-outline";
		} else if (route.name === "Failures") {
			iconName = focused ? "ios-warning" : "ios-warning-outline";
		} else if (route.name === "Pollution") {
			return <Feather name="wind" size={24} color={color} />;
		} else if (route.name === "Receipts") {
			iconName = focused ? "ios-receipt" : "ios-receipt-outline";
		}

		return <Ionicons name={iconName} size={24} color={color} />;
	}
});
