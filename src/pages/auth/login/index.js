import React from 'react';
import {StatusBar, View, Image} from 'react-native';
import Styles from './style';
import BgBr from '../../../assets/backgroundBottomRight.svg';
import BgTL from '../../../assets/backgroundTopLeft.svg';

export default Login = () => {
  return (
    <View style={Styles.View}>
      <View style={Styles.ImageLeft}>
        <BgTL width="100%" height="100%" />
      </View>
      <View style={Styles.ImageRight}>
        <BgBr width="100%" height="100%" />
      </View>
      <StatusBar backgroundColor="#EAEAEA" barStyle="dark-content" />
      <View style={Styles.Card}></View>
    </View>
  );
};
