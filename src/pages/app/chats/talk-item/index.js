import React, { memo } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import Styles from './style';
import DefaultProfile from '../../../../assets/icons/defaultProfile.svg';
import { formatToLocale } from './../../../../helpers/Date';
import { useNavigation } from '@react-navigation/native';

function TalkItem({ user, room_id, lastMessage }) {
	const navigation = useNavigation();

	const lastMessageTime = formatToLocale(
		lastMessage.created_at || Date.now(),
		'HH:mm',
	);

	function goToChat() {
		navigation.navigate('Room', { roomId: room_id });
	}

	return (
		<TouchableOpacity style={Styles.Wrapper} onPress={goToChat}>
			<View style={Styles.UserAvatar}>
				{user.avatar_url ? (
					<Image
						source={{ uri: user.avatar_url }}
						style={{
							height: '90%',
							width: '90%',
							borderRadius: 100,
						}}
					/>
				) : (
					<DefaultProfile height="90%" width="90%" />
				)}
			</View>
			<View style={Styles.MiddleContainer}>
				<Text style={Styles.UserName}>
					{user.first_name} {user.last_name}
				</Text>
				{lastMessage && (
					<Text style={Styles.LastMessage}>
						{lastMessage.message}
					</Text>
				)}
			</View>

			<Text style={Styles.Time}>{lastMessageTime}</Text>
		</TouchableOpacity>
	);
}

export default memo(TalkItem);
