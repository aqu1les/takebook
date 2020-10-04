import React, { useRef, useState, memo, useMemo } from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Animated,
    Text,
} from 'react-native';
import Styles from './style';
import SearchIcon from '../../../../assets/icons/search.svg';
import MenuIcon from '../../../../assets/icons/menu.svg';
import FilterService from '../../../../services/FilterService';

function Header(props) {
    const searchInput = useRef(null);
    const [searchName, setSearchName] = useState('');
    const [widthValue] = useState(new Animated.Value(0.75));
    const [searchFocused, setSearchFocused] = useState(false);

    useMemo(() => {
        FilterService.filterByWord(searchName);
    }, [searchName]);

    function openMenu() {
        props.navigation.toggleDrawer();
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

    return props.title ? (
        <View
            style={[
                Styles.Header,
                { justifyContent: 'flex-start', elevation: 5 },
            ]}>
            <TouchableOpacity onPress={openMenu} style={{ padding: 10 }}>
                <MenuIcon style={{ marginHorizontal: 15 }} />
            </TouchableOpacity>
            <Text style={Styles.Title}>{props.title}</Text>
        </View>
    ) : (
        <View
            style={[
                Styles.Header,
                searchFocused && { justifyContent: 'center' },
            ]}>
            <TouchableOpacity onPress={openMenu} style={{ padding: 10 }}>
                <MenuIcon
                    style={{ display: searchFocused ? 'none' : 'flex' }}
                />
            </TouchableOpacity>
            <Animated.View
                style={[Styles.Search, { flex: widthValue }]}
                onPress={() => searchInput.current.focus()}>
                <SearchIcon />
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
                    onEndEditing={_normalAnimation}
                />
            </Animated.View>
        </View>
    );
}

export default memo(Header);
