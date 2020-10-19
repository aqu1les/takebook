import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import AppStore from './redux/store';
import Routes from './routes';
import i18n from './languages/i18n';
import { enableScreens } from 'react-native-screens';
import { getStoredLanguage } from './services/UserService';

enableScreens();

export default function App() {
	useEffect(() => {
		async function loadLanguage() {
			const storedLanguage = await getStoredLanguage();
			if (storedLanguage) {
				i18n.changeLanguage(storedLanguage);
			}
		}

		loadLanguage();
	}, []);
	return (
		<Provider store={AppStore}>
			<PaperProvider>
				<Routes />
			</PaperProvider>
		</Provider>
	);
}

LogBox.ignoreLogs(['Setting a timer']);
