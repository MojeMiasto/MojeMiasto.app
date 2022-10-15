import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "./styles";

export const screenOptions = ({ route }) => ({
	headerShown: false,
	tabBarIcon: ({ focused, color, size }) => {
		let iconName;

		if (route.name === "Waste") {
			iconName = focused ? "ios-trash" : "ios-trash-outline";
		} else if (route.name === "Failures") {
			iconName = focused ? "ios-warning" : "ios-warning-outline";
		}

		return <Ionicons name={iconName} size={size} color={color} />;
	},
	tabBarStyle: {
		backgroundColor: colors.primaryLight,
		borderTopWidth: 0
	},
	tabBarInactiveTintColor: colors.text,
	tabBarActiveTintColor: colors.accentLight
});
