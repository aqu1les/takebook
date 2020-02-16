import React, { useEffect, useState } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import Styles from './style';
import Logo from '../../assets/logo.svg';
import BgBr from '../../assets/background/backgroundBottomRight.svg';
import BgTL from '../../assets/background/backgroundTopLeft.svg';
import { isTokenValid } from '../../services/UserService';
import UserStore from '../../stores/UserStore';

export default function Loading(props) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const unsubscribeUserStore = UserStore.subscribe(state => {
            setLoading(state.loading);
        });

        async function checkToken() {
            const validToken = await isTokenValid();
            if (validToken) {
                UserStore.loadUserInfo();
                navigateTo('App');
            } else {
                navigateTo('Login');
            }
        }
        function navigateTo(route) {
            StatusBar.setHidden(false);
            StatusBar.setBarStyle('light-content');
            props.navigation.navigate(route);
        }

        checkToken();

        return () => {
            unsubscribeUserStore();
        };
    }, [props.navigation]);

    return (
        <>
            <StatusBar
                backgroundColor={'#FFFFFF'}
                barStyle={'dark-content'}
                hidden={true}
            />
            <View style={Styles.Container}>
                <View style={Styles.ImageLeft}>
                    <BgTL width={'100%'} height={'100%'} />
                </View>
                <View style={Styles.ImageRight}>
                    <BgBr width={'100%'} height={'100%'} />
                </View>
                <View>
                    <Logo />
                </View>
                {loading && (
                    <ActivityIndicator
                        color={'#fb8c00'}
                        style={Styles.ActvIndicator}
                    />
                )}
            </View>
        </>
    );
}
