import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import Styles from './style';
import Logo from '../../assets/logo.svg';
import BgBr from '../../assets/background/backgroundBottomRight.svg';
import BgTL from '../../assets/background/backgroundTopLeft.svg';
import {
    checkTokenAction,
    setUserAction,
    tokenValidated,
} from '../../redux/actions/authentication';
import { setNotificationsAction } from '../../redux/actions/notification';
import ApiService from '../../services/ApiService';
import { getToken } from '../../services/UserService';
import { loadFavoritesAction } from '../../redux/actions/fav';
import { Transition, Transitioning } from 'react-native-reanimated';

export default function Loading(props) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const authenticated = useSelector(state => state.auth.authenticated);

    const transition = <Transition.Change interpolation="easeInOut" />;

    useEffect(() => {
        async function checkIfTokenValid() {
            const token = await getToken();
            if (token) {
                dispatch(checkTokenAction());
                try {
                    const response = await ApiService.get('/users/me');
                    if (response) {
                        if (response.status === 200) {
                            dispatch(
                                setNotificationsAction(
                                    response.data.notifications,
                                ),
                            );
                            await dispatch(
                                setUserAction({ ...response.data, token }),
                            );
                            await dispatch(tokenValidated());
                            dispatch(loadFavoritesAction());
                            navigateTo('App');
                        } else {
                            navigateTo('Login');
                        }
                    } else {
                        navigateTo('Login');
                    }
                } catch (e) {
                    navigateTo('Login');
                }
            } else {
                navigateTo('Login');
            }
        }
        if (!authenticated && !loading) {
            checkIfTokenValid();
        } else {
            props.navigation.navigate('Main');
        }
    }, [dispatch, loading, authenticated]);

    function navigateTo(route) {
        StatusBar.setHidden(false);
        StatusBar.setBarStyle('light-content');
        props.navigation.navigate(route);
    }

    return (
        <>
            <StatusBar
                backgroundColor={'#FFFFFF'}
                barStyle={'dark-content'}
                hidden={true}
            />
            <Transitioning.View
                transition={transition}
                style={Styles.Container}>
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
            </Transitioning.View>
        </>
    );
}
