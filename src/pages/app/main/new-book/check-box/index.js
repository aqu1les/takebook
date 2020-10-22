import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Styles from './style';

function CheckboxRow({ value, handleCheckBox, category }) {
	function onPress() {
		handleCheckBox(!value, category);
	}

	return (
		<TouchableOpacity style={Styles.Box} onPress={onPress}>
			<Checkbox
				status={value ? 'checked' : 'unchecked'}
				onPress={onPress}
			/>
			<Text>{category.name}</Text>
		</TouchableOpacity>
	);
}

export default CheckboxRow;
