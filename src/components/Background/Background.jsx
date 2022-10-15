import defaultStyles, { colors } from "../../styles";
import { LinearGradient } from "expo-linear-gradient";

export default function Background({ children }) {
	return (
		<>
			<LinearGradient
				colors={[colors.primaryLight, colors.primaryDark]}
				start={{ x: 1, y: 0 }}
				style={defaultStyles.background}
			/>
			{children}
		</>
	);
}
