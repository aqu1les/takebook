import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Styles from './style';
import FastImage from 'react-native-fast-image';
import DefaultProfile from '../../../../../../../../assets/icons/defaultProfile.svg';
import FeatherIcon from 'react-native-vector-icons/Feather';

function UserItem({ user, onClick, isSelected = false }) {
	return (
		<TouchableOpacity
			style={Styles.SelectItemWrapper}
			onPress={() => onClick(user.id)}>
			{user.avatar_url ? (
				<FastImage
					source={{ uri: user.avatar_url }}
					style={Styles.UserAvatar}
				/>
			) : (
				<DefaultProfile height="90%" />
			)}
			<Text style={Styles.SelectItemText}>{user.full_name}</Text>
			<FeatherIcon
				name={isSelected ? 'check-circle' : 'circle'}
				size={22}
				color="#38C2FF"
				style={Styles.SelectItemIcon}
			/>
		</TouchableOpacity>
	);
}

export default UserItem;
