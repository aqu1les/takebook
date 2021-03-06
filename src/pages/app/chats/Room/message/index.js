import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import Styles from './style';
import { formatToLocale } from './../../../../../helpers/Date';

function Message({ item, loggedUser }) {
	return (
		<TouchableOpacity
			style={[
				Styles.Message,
				loggedUser.id === item.user_id
					? Styles.MyMessage
					: Styles.NotMyMessage,
			]}>
			<Text style={Styles.Text}>{item.message}</Text>
			<Text style={Styles.CreationTime}>
				{formatToLocale(item.created_at, 'HH:mm')}
			</Text>
		</TouchableOpacity>
	);
}

export default memo(Message);
