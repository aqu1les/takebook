import React, { useState, memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Styles from './style';

function CheckboxRow({ value, handleCheckBox, category }) {
	const [checked, setChecked] = useState(value);

	function onPress() {
		setChecked((v) => {
			handleCheckBox(!v, category);
			return !v;
		});
	}

	return (
		<TouchableOpacity style={Styles.Box} onPress={onPress}>
			<Checkbox
				status={checked ? 'checked' : 'unchecked'}
				onPress={onPress}
			/>
			<Text>{category.name}</Text>
		</TouchableOpacity>
	);
}

export default memo(CheckboxRow);
