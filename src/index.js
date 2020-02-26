import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import AppStore from './redux/store';
import Routes from './routes';

export default function App() {
    return (
        <Provider store={AppStore}>
            <Routes />
        </Provider>
    );
}

YellowBox.ignoreWarnings(['Setting a timer']);
console.ignoredYellowBox = ['Setting a timer'];
