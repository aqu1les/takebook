import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FilterService from '../../../../../services/FilterService';
import Styles from './style';
import { useTranslation } from 'react-i18next';

function CategoryItem({ name, id, selected }) {
	const { t } = useTranslation();
	let icon;
	let displayName;

	switch (name) {
		case 'Destaques':
		case 'Highlights':
			icon = selected ? 'star' : 'star-outline';
			displayName = t('categories.highlights');
			break;
		case 'Terror':
			icon = 'drama-masks';
			displayName = t('categories.horror');
			break;
		case 'Comédia':
			icon = 'emoticon-happy-outline';
			displayName = t('categories.comedy');
			break;
		case 'Mistério':
			icon = 'magnify';
			displayName = t('categories.mistery');
			break;
		case 'Aventura':
			icon = 'run';
			displayName = t('categories.adventure');
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
				{displayName || name}
			</Text>
		</TouchableOpacity>
	);
}

export default memo(CategoryItem);
