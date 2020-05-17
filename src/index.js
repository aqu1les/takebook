import 'react-native-gesture-handler';
import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import AppStore from './redux/store';
import Routes from './routes';
import i18n from './languages/i18n';
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
    return (
        <Provider store={AppStore}>
            <PaperProvider>
                <Routes />
            </PaperProvider>
        </Provider>
    );
}

YellowBox.ignoreWarnings(['Setting a timer']);
console.ignoredYellowBox = ['Setting a timer'];
