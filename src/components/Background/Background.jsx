import { SafeAreaView } from "react-native";
import defaultStyles, { colors } from "../../styles";
import { LinearGradient } from "expo-linear-gradient";

export default function Background({ children, wrapperStyle }) {
	return (
		<>
			<LinearGradient
				colors={[colors.primaryLight, colors.primaryDark]}
				start={{ x: 1, y: 0 }}
				style={defaultStyles.background}
			/>
			<SafeAreaView style={[wrapperStyle, defaultStyles.wrapper]}>
				{children}
			</SafeAreaView>
		</>
	);
}
