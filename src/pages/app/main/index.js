import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from "react-redux";
import Styles from './style';
import Header from '../components/header';

export default Main = (props) => {
    const user = useSelector(state => state.auth);
    return (
        <View style={Styles.Container}>
            <Header navigation={props.navigation} />
            <Text>{user.first_name}, VC ESTAR NA MAIN</Text>
        </View>
    )
}