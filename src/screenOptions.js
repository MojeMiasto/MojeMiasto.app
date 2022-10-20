import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export const screenOptions = ({ route }) => ({
	headerShown: false,
	tabBarIcon: ({ focused, color }) => {
		let iconName;

		if (route.name === "Waste") {
			iconName = focused ? "ios-trash" : "ios-trash-outline";
		} else if (route.name === "Failures") {
			iconName = focused ? "ios-warning" : "ios-warning-outline";
		}

		return <Ionicons name={iconName} size={24} color={color} />;
	}
});
