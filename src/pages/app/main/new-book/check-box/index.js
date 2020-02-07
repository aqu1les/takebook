import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Text, TouchableOpacity } from 'react-native';

export default Checkbox = ({ value, handleCheckBox, category }) => {
    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
                value={value}
                onValueChange={v => handleCheckBox(v, category)}
            />
            <Text>{category.name}</Text>
        </TouchableOpacity>
    );
};
