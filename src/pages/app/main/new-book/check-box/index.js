import React, { useState, memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

function CheckboxRow({ value, handleCheckBox, category }) {
    const [checked, setChecked] = useState(value);

    function onPress() {
        setChecked(v => {
            handleCheckBox(!v, category);
            return !v;
        });
    }

    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={onPress}>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={onPress}
            />
            <Text>{category.name}</Text>
        </TouchableOpacity>
    );
}

export default memo(CheckboxRow);
