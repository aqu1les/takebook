import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from "react-redux";
import Styles from './style';

export default Main = () => {
    const user = useSelector(state => state.auth);
    return (
        <View style={Styles.Container}>
            <Text>{user.first_name}, VC ESTAR NA MAIN</Text>
        </View>
    )
}