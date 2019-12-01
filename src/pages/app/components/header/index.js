import React, { useRef } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Styles from './style';
import Search from '../../../../assets/icons/search.svg';
import MenuIcon from '../../../../assets/icons/menu.svg';

export default Header = (props) => {
    const searchInput = useRef(null);

    function openMenu() {
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }
    return (
        <>
            <View style={Styles.Header}>
                <TouchableOpacity onPress={openMenu}>
                    <MenuIcon />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.Search} onPress={() => searchInput.current.focus()}>
                    <Search />
                    <TextInput
                        ref={searchInput}
                        style={Styles.Input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        value="TESTANSOSDASDJKNA"
                        onChangeText={() => { }}
                        keyboardType="default"
                        returnKeyType="search"
                    />
                </TouchableOpacity>
            </View>
        </>
    );
}