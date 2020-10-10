import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterService from '../../../../../services/FilterService';
import Styles from './style';

function CategoryItem({ name, id, selected }) {
	let icon;
	switch (name) {
		case 'Destaques':
		case 'Highlights':
			icon = selected ? 'star' : 'star-outline';
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

	function filterByCat() {
		FilterService.changeCategory(id);
	}

	return (
		<TouchableOpacity
			style={[
				Styles.Category,
				selected && { backgroundColor: '#e5e5e5' },
			]}
			onPress={filterByCat}>
			<Icon
				name={icon}
				size={26}
				color={selected ? '#fb8c00' : '#000000'}
			/>
			<Text style={{ color: selected ? '#fb8c00' : '#000000' }}>
				{name}
			</Text>
		</TouchableOpacity>
	);
}

export default memo(CategoryItem);
