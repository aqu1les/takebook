import React from 'react';
import { StatusBar, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import Styles from './style';
import BgBr from '../../../../assets/background/backgroundBottomRight.svg';
import BgTL from '../../../../assets/background/backgroundTopLeft.svg';

export default Template = (props) => {
    return (
        <>
            <StatusBar backgroundColor="#EAEAEA" barStyle="dark-content" />
            <View style={Styles.View}>
                <View style={Styles.ImageLeft}>
                    <BgTL width="100%" height="100%" />
                </View>
                <View style={Styles.ImageRight}>
                    <BgBr width="100%" height="100%" />
                </View>
                <KeyboardAvoidingView style={Styles.Card} behavior="height" keyboardVerticalOffset={400} enabled>
                    {props.children}
                </KeyboardAvoidingView>
            </View>
        </>
    );
}