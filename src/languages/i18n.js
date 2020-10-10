import i18n from 'i18next';
import { Platform, NativeModules } from 'react-native';
import { initReactI18next } from 'react-i18next';
import en from './en-US';
import pt from './pt-BR';

const normalizeTranslate = {
	en_US: 'en',
	pt_BR: 'pt',
	en: 'en',
	pt: 'pt',
};

const languageDetector = {
	type: 'languageDetector',
	async: true,
	detect: function (callback) {
		const language =
			Platform.OS === 'ios'
				? NativeModules.SettingsManager.settings.AppleLocale // Adquire o idioma no device iOS
				: NativeModules.I18nManager.localeIdentifier;
		callback(normalizeTranslate[language]);
	},
	init: () => {},
	cacheUserLanguage: () => {},
};

i18n.use(languageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',

		resources: { pt, en },

		debug: true,
		react: {
			wait: true,
		},
	});

export default i18n;
