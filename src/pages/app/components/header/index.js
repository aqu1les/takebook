import React, { useRef, useState, memo } from 'react';
import { View, TouchableOpacity, TextInput, Animated } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Styles from './style';
import Search from '../../../../assets/icons/search.svg';
import MenuIcon from '../../../../assets/icons/menu.svg';

function Header(props) {
    const searchInput = useRef(null);
    const [searchName, setSearchName] = useState('');
    const [widthValue] = useState(new Animated.Value(0.75));
    const [searchFocused, setSearchFocused] = useState(false);

    function openMenu() {
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }
    const _widthAnimation = () => {
        setSearchFocused(true);
        Animated.timing(widthValue, {
            toValue: 0.9,
            duration: 250,
        }).start();
    };
    const _normalAnimation = () => {
        setSearchFocused(false);
        Animated.timing(widthValue, {
            toValue: 0.75,
            duration: 250,
        }).start();
    };

    return (
        <View
            style={[
                Styles.Header,
                searchFocused && { justifyContent: 'center' },
            ]}>
            <TouchableOpacity onPress={openMenu}>
                <MenuIcon
                    style={{ display: !searchFocused ? 'flex' : 'none' }}
                />
            </TouchableOpacity>
            <Animated.View
                style={[Styles.Search, { flex: widthValue }]}
                onPress={() => searchInput.current.focus()}>
                <Search />
                <TextInput
                    ref={searchInput}
                    style={Styles.Input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    value={searchName}
                    onChangeText={value => setSearchName(value)}
                    keyboardType="default"
                    returnKeyType="search"
                    onFocus={_widthAnimation}
                    onBlur={_normalAnimation}
                />
            </Animated.View>
        </View>
    );
}

export default memo(Header);
