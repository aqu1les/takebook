import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
	View,
	Text,
	FlatList,
	RefreshControl,
	ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import Styles from './style';
import Advert from './advert';
import { useTranslation } from 'react-i18next';
import FilterService from '../../../../services/FilterService';

export default function AdvertList({
	navigation,
	refreshAdverts,
	onEndReached,
}) {
	const { t } = useTranslation();
	const [refreshing, setRefreshing] = useState(false);
	const advList = useRef();
	const adverts = useSelector((state) => state.adverts.data);
	const loadingMore = useSelector((state) => state.adverts.loadingMore);
	const [filterTerm, setFilterTerm] = useState('');
	const [filterCat, setFilterCat] = useState(null);

	const filteredAdverts = useMemo(() => {
		if (filterCat === 'b239-8956' && !filterTerm) {
			return adverts;
		}

		if (filterCat && !filterTerm) {
			const filtered = adverts.filter((book) => {
				return book.categories.find((cat) => cat.id === filterCat);
			});

			return filtered;
		}

		if (filterTerm) {
			return adverts.filter(
				(book) =>
					book.title
						.toLowerCase()
						.indexOf(filterTerm.toLowerCase()) !== -1,
			);
		}

		return adverts;
	}, [filterTerm, filterCat, adverts]);

	useEffect(() => {
		let isMounted = true;
		const unsub = FilterService.subscribe(({ category, searchTerm }) => {
			if (isMounted) {
				setFilterTerm(searchTerm);
				setFilterCat(category);
			}
		});

		return () => {
			isMounted = false;
			unsub();
		};
	}, []);

	async function refreshAds() {
		setRefreshing(true);
		refreshAdverts();
		setRefreshing(false);
	}

	function handleOnEndReached({ nativeEvent }) {
		if (_isAtTheEnd(nativeEvent)) {
			onEndReached();
		}
	}

	function _isAtTheEnd(nativeEvent) {
		return (
			nativeEvent.layoutMeasurement.height +
				nativeEvent.contentOffset.y >=
			nativeEvent.contentSize.height - 1
		);
	}

	return (
		<View style={Styles.Content}>
			<Text style={Styles.H1}>{t('advertList.recent')}</Text>
			{filteredAdverts.length > 0 ? (
				<>
					<FlatList
						ref={advList}
						data={filteredAdverts}
						renderItem={({ item }) => (
							<Advert item={item} navigation={navigation} />
						)}
						keyExtractor={(item) => {
							return `filtered-${item.id}`;
						}}
						onScroll={handleOnEndReached}
						refreshControl={
							<RefreshControl
								colors={['#fb8c00', '#38C2FF']}
								refreshing={refreshing}
								onRefresh={refreshAds}
							/>
						}
						showsVerticalScrollIndicator={false}
					/>
					{loadingMore ? <ActivityIndicator color="#38C2FF" /> : null}
				</>
			) : (
				<Text>{t('advertList.noBooks')}</Text>
			)}
		</View>
	);
}
