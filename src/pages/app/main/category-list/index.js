import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CategoryItem from './category-item';
import Styles from './style';
import FilterService from '../../../../services/FilterService';

function CategoryList(props) {
	const { t } = useTranslation();
	const categories = useSelector((state) => state.categories.data);
	const [selectedCat, setSelectedCat] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const unsubscribe = FilterService.subscribe(
			({ category, searchTerm }) => {
				if (isMounted) {
					changeSelCat(category);
				}
			},
		);

		changeSelCat(FilterService.category);
		return function cleanup() {
			isMounted = false;
			unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const changeSelCat = useCallback((category) => {
		if (category !== selectedCat) {
			setSelectedCat(category);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function renderSeparator() {
		return <View style={Styles.Separator} />;
	}

	return (
		<View style={Styles.Categories}>
			<FlatList
				data={[
					{ id: 'b239-8956', name: t('categories.highlights') },
					...categories,
				]}
				renderItem={({ item }) => (
					<CategoryItem
						name={item.name}
						id={item.id}
						selected={selectedCat === item.id}
					/>
				)}
				keyExtractor={(item) => `cat-${item.id}`}
				horizontal={true}
				contentContainerStyle={{
					justifyContent: 'space-around',
					width: '100%',
				}}
				ItemSeparatorComponent={renderSeparator}
			/>
		</View>
	);
}

export default CategoryList;
