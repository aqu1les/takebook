import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';
import Styles from './style';
import { loadChatsAction } from '../../../redux/actions/chat';
import TalkItem from './talk-item';
import EmptyList from '../../../assets/empty-chat.svg';
import { useTranslation } from 'react-i18next';
import { RectButton } from 'react-native-gesture-handler';

export default function RoomList({ route, navigation }) {
	const { t: trans } = useTranslation();
	const dispatch = useDispatch();
	const { user: receiver } = route.params;
	const chats = useSelector((state) => state.chats.chats);
	const loading = useSelector((state) => state.chats.loading);

	const loadChats = useCallback(() => {
		dispatch(loadChatsAction());
	}, [dispatch]);

	useEffect(() => {
		loadChats();
	}, [loadChats]);

	useEffect(() => {
		if (receiver) {
			let push;
			const chat = chats.find((c) => c.user.id === receiver.id);
			if (chat) {
				push = StackActions.push('Room', {
					roomId: chat.room_id || chat.id,
				});
				navigation.setParams({ user: null });
				navigation.dispatch(push);
			}
		}
	}, [receiver, chats, navigation]);

	function renderSeparator() {
		return <View style={Styles.Divider} />;
	}

	return (
		<View style={Styles.Container}>
			{chats.length > 0 ? (
				<FlatList
					data={chats}
					renderItem={({ item }) => (
						<TalkItem
							user={item.user}
							lastMessage={item.messages[0]}
							room_id={item.id}
							navigation={navigation}
						/>
					)}
					keyExtractor={(item) => String(item.id)}
					contentContainerStyle={Styles.ListContainer}
					refreshControl={
						<RefreshControl
							colors={['#fb8c00', '#38C2FF']}
							refreshing={loading}
							onRefresh={loadChats}
						/>
					}
					ItemSeparatorComponent={renderSeparator}
				/>
			) : (
				<View style={Styles.EmptyList}>
					<EmptyList width={'50%'} height={'50%'} />
					<Text style={Styles.CenterText}>
						{trans('chats.noChats_1')}
					</Text>
					<Text style={Styles.CenterText}>
						{trans('chats.noChats_2')}
					</Text>
					<RectButton onPress={loadChats} style={Styles.LoadButton}>
						<Text
							style={[Styles.CenterText, Styles.LoadButtonText]}>
							{trans('chats.loadChats')}
						</Text>
					</RectButton>
				</View>
			)}
		</View>
	);
}
