import React from 'react';
import {
    StatusBar,
    View,
    KeyboardAvoidingView,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import Styles from './style';
import BgBr from '../../../../assets/background/backgroundBottomRight.svg';
import BgTL from '../../../../assets/background/backgroundTopLeft.svg';
import Logo from '../../../../assets/logo.svg';

export default Template = props => {
    return (
        <>
            <StatusBar backgroundColor="#EAEAEA" barStyle="dark-content" />
            <SafeAreaView style={Styles.View}>
                <View style={Styles.ImageLeft}>
                    <BgTL width="100%" height="100%" />
                </View>
                <View style={Styles.ImageRight}>
                    <BgBr width="100%" height="100%" />
                </View>
                <KeyboardAvoidingView
                    style={Styles.Card}
                    behavior="height"
                    keyboardVerticalOffset={400}
                    enabled>
                    <View style={Styles.Header}>
                        <Logo width="80%" height="80%" />
                    </View>
                    {props.children}
                </KeyboardAvoidingView>
                {props.loading && (
                    <ActivityIndicator
                        color={'#fb8c00'}
                        style={Styles.ActvIndicator}
                    />
                )}
            </SafeAreaView>
        </>
    );
};
