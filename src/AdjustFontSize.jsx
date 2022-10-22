import { Text } from "react-native";
import { useState } from "react";

export function AdjustFontSize({ fontSize, text, style, numberOfLines }) {
	const [currentFont, setCurrentFont] = useState(fontSize);

	return (
		<Text
			numberOfLines={numberOfLines}
			adjustsFontSizeToFit={true}
			style={[style, { fontSize: currentFont }]}
			onTextLayout={(e) => {
				const { lines } = e.nativeEvent;
				if (lines.length > numberOfLines) {
					setCurrentFont(currentFont - 1);
				}
			}}
		>
			{text}
		</Text>
	);
}
