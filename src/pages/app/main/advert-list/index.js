import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
} from 'react';
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
import { RectButton } from 'react-native-gesture-handler';
import AntDesginIcon from 'react-native-vector-icons/AntDesign';

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
	const isMounted = useRef(true);

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
		const unsub = FilterService.subscribe(({ category, searchTerm }) => {
			if (isMounted.current) {
				setFilterTerm(searchTerm);
				setFilterCat(category);
			}
		});

		return () => {
			isMounted.current = false;
			unsub();
		};
	}, []);

	const _isAtTheEnd = useCallback(
		(nativeEvent) =>
			nativeEvent.layoutMeasurement.height +
				nativeEvent.contentOffset.y >=
			nativeEvent.contentSize.height - 1,
		[],
	);

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
						keyExtractor={(item) => `filtered-${item.id}`}
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
				<>
					<Text>{t('advertList.noBooks')}</Text>
					<View style={Styles.EmptyContainer}>
						<RectButton
							style={Styles.ReloadButton}
							onPress={refreshAds}>
							<AntDesginIcon
								name="reload1"
								color="#FFF"
								size={32}
							/>
						</RectButton>
					</View>
				</>
			)}
		</View>
	);
}
