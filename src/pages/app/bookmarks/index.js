import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import Styles from './style';
import { loadFavoritesAction } from './../../../redux/actions/fav';
import Advert from '../main/advert-list/advert';
import { RectButton } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

export default function AdList({ navigation }) {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const likedAdverts = useSelector((state) => state.likes.data);
	const loading = useSelector((state) => state.likes.loading);
	const user = useSelector((state) => state.auth);

	const loadFavorites = useCallback(() => {
		dispatch(loadFavoritesAction());
	}, [dispatch]);

	useEffect(() => {
		loadFavorites();
	}, [loadFavorites]);

	return (
		<View style={Styles.Container}>
			{likedAdverts instanceof Array && likedAdverts.length > 0 && (
				<FlatList
					data={likedAdverts}
					renderItem={({ item }) => (
						<Advert
							item={item}
							navigation={navigation}
							owner={item.owner}
							user={user}
							liked={true}
						/>
					)}
					refreshControl={
						<RefreshControl
							colors={['#fb8c00', '#38C2FF']}
							refreshing={loading}
							onRefresh={loadFavorites}
						/>
					}
					keyExtractor={(item) => String(item.id)}
					showsVerticalScrollIndicator={false}
				/>
			)}

			{likedAdverts instanceof Array && likedAdverts.length === 0 && (
				<View style={Styles.EmptyListContainer}>
					<Text style={Styles.Text}>{t('favorites.text1')}</Text>
					<Text style={Styles.Text}>{t('favorites.text2')}</Text>
					<RectButton
						onPress={loadFavorites}
						style={Styles.LoadButton}>
						<Text style={Styles.LoadButtonText}>
							{t('favorites.button')}
						</Text>
					</RectButton>
				</View>
			)}
		</View>
	);
}
