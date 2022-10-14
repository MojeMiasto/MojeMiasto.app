import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

import pl from "./src/assets/translations/pl";
// import en from "./src/assets/translations/en";

const LANGUAGES = {
	pl
};

const LANGUAGE_DETECTOR = {
	type: "languageDetector",
	async: true,
	detect: (callback) => {
		AsyncStorage.getItem("user-language", (err, language) => {
			if (err || !language) {
				if (err) {
					console.error(
						"Error while getting user language from AsyncStorage",
						err
					);
				} else {
					console.warn("No language set, falling back to default");
				}
				const findBestAvailableLanguage = Localization.locale;

				callback(findBestAvailableLanguage?.languageTag || "pl");
				return;
			}
			callback(language);
		});
	},
	init: () => {},
	cacheUserLanguage: (language) => {
		AsyncStorage.setItem("user-language", language);
	}
};

i18n
	.use(LANGUAGE_DETECTOR)
	.use(initReactI18next)
	.init({
		resources: LANGUAGES,
		fallbackLng: "pl",
		react: {
			useSuspense: false
		},
		interpolation: {
			escapeValue: false
		}
	});
