import React, { useEffect, useState } from 'react';
import { View, StatusBar, ToastAndroid, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { setUserAction } from '../../services/redux/actions/auth';
import { loadAdvertsAction } from '../../services/redux/actions/adverts';
import { loadCategoriesAction } from '../../services/redux/actions/categories';
import api from '../../services/api';
import Styles from './style';
import Logo from '../../assets/logo.svg';
import BgBr from '../../assets/background/backgroundBottomRight.svg';
import BgTL from '../../assets/background/backgroundTopLeft.svg';

export default Loading = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function checkUser() {
            const response = await api.get('/users/me');
            setLoading(true);
            if (!response) {
                return props.navigation.navigate('Auth');
            }
            if (response.data) {
                dispatch(setUserAction(response.data));
                dispatch(loadAdvertsAction());
                dispatch(loadCategoriesAction());
                ToastAndroid.show('Bem vindo ao Takebook !', ToastAndroid.SHORT);
                setTimeout(() => {
                    setLoading(false);
                    props.navigation.navigate('App');
                }, 1000);
            }
        }
        async function getToken() {
            const token = await AsyncStorage.getItem('userToken:TB');
            return token ? await checkUser() : props.navigation.navigate('Auth');
        }
        getToken();
    }, [dispatch]);
    return (
        <>
            <StatusBar backgroundColor='#FFFFFF' barStyle='dark-content' />
            <View style={Styles.Container}>
                <View style={Styles.ImageLeft}>
                    <BgTL width='100%' height='100%' />
                </View>
                <View style={Styles.ImageRight}>
                    <BgBr width='100%' height='100%' />
                </View>
                <Logo />
                <ActivityIndicator color={'#fb8c00'} style={[{ display: 'none' }, loading && Styles.ActvIndicator]} />
            </View>
        </>
    )
}