import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';

export default function CategoryItem({ name }) {
    let icon;
    switch (name) {
        case 'Destaques':
            icon = 'star-outline';
            break;
        case 'Terror':
            icon = 'drama-masks';
            break;
        case 'Comédia':
            icon = 'emoticon-happy-outline';
            break;
        case 'Mistério':
            icon = 'magnify';
            break;
        case 'Aventura':
            icon = 'run';
            break;
    }
    return (
        <TouchableOpacity style={Styles.Category}>
            <Icon name={icon} size={26} color="#000000" />
            <Text>{name}</Text>
        </TouchableOpacity>
    );
}