import React, { useEffect, useState } from 'react';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import Styles from './style';
import Logo from '../../assets/logo.svg';
import BgBr from '../../assets/background/backgroundBottomRight.svg';
import BgTL from '../../assets/background/backgroundTopLeft.svg';
import { isTokenValid } from '../../services/UserService';
import { getCategories } from '../../services/CategoriesService';
import { getAdverts } from '../../services/AdvertsService';

export default Loading = props => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function checkToken() {
            const validToken = await isTokenValid();
            if (validToken) {
                const categories = await getCategories();
                const adverts = await getAdverts();
                if (categories.length > 0) navigateTo('App');
            } else {
                navigateTo('Login');
            }
        }
        checkToken();
        setLoading(true);
    }, []);

    function navigateTo(route) {
        props.navigation.navigate(route);
    }

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
                {loading && (
                    <ActivityIndicator
                        color={'#fb8c00'}
                        style={Styles.ActvIndicator}
                    />
                )}
            </View>
        </>
    );
};
