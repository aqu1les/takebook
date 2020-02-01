import React, { useEffect, useState } from 'react';
import { View, StatusBar, ToastAndroid, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
    const categories = useSelector(state => state.categories.data);

    useEffect(() => {
        async function checkUser() {
            const token = await getToken();
            if (token) {
                const response = await api.get('/users/me');
                if (response.data) {
                    dispatch(setUserAction(response.data));
                } else {
                    props.navigation.navigate('Login');
                }
            } else {
                props.navigation.navigate('Login');
            }
        }
        async function getToken() {
            const token = await AsyncStorage.getItem('userToken:TB');
            return token;
        }
        if (categories.length > 0) {
            ToastAndroid.show('Bem vindo ao Takebook !', ToastAndroid.SHORT);
            setLoading(false);
            props.navigation.navigate('App');
        }
        dispatch(loadAdvertsAction());
        dispatch(loadCategoriesAction());
        checkUser();
        setLoading(true);
    }, [dispatch, categories]);
    return (
        <>
            <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
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
                {loading && <ActivityIndicator color={'#fb8c00'} style={Styles.ActvIndicator} />}
            </View>
        </>
    )
}