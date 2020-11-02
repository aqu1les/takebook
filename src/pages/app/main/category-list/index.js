import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CategoryItem from './category-item';
import Styles from './style';
import FilterService from '../../../../services/FilterService';

function CategoryList() {
	const { t } = useTranslation();
	const categories = useSelector((state) => state.categories.data);
	const [selectedCat, setSelectedCat] = useState(null);
	const isMounted = useRef(true);

	useEffect(() => {
		const unsubscribe = FilterService.subscribe(({ category }) => {
			if (isMounted.current) {
				setSelectedCat((v) => (v !== category ? category : v));
			}
		});

		setSelectedCat(FilterService.category);
		return () => {
			isMounted.current = false;
			unsubscribe();
		};
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
				contentContainerStyle={Styles.CategoriesListContainer}
				ItemSeparatorComponent={renderSeparator}
			/>
		</View>
	);
}

export default CategoryList;
