import React, { useState, useRef, useMemo } from 'react';
import {
	View,
	Text,
	TextInput,
	FlatList,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Styles from './style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import UserItem from './user-item/index';
import { useTranslation, Trans } from 'react-i18next';

function SelectUserModal({ isVisible, onCloseModal }) {
	const { t } = useTranslation();
	const chatUsers = useSelector((state) =>
		state.chats.chats.map((c) => c.user),
	);
	const [selectedUser, setSelectedUser] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const searchInput = useRef(null);

	const selectedUserName = useMemo(
		() =>
			selectedUser
				? chatUsers.find((u) => selectedUser === u.id).full_name
				: '',
		[selectedUser, chatUsers],
	);

	const filteredUsers = useMemo(() => {
		return chatUsers.filter(
			(user) =>
				user.full_name
					.toLowerCase()
					.indexOf(searchTerm.toLowerCase()) !== -1,
		);
	}, [chatUsers, searchTerm]);

	function closeModal() {
		onCloseModal({ userId: selectedUser });
	}

	return (
		<Modal
			style={Styles.Modal}
			isVisible={isVisible}
			animationIn="zoomIn"
			animationOut="zoomOut">
			<KeyboardAvoidingView
				style={Styles.ModalCard}
				keyboardVerticalOffset={20}>
				<RectButton
					onPress={() => searchInput.current.focus()}
					style={Styles.SearchContainer}>
					<FeatherIcon name="search" size={26} color="#424242" />
					<TextInput
						ref={searchInput}
						style={Styles.Input}
						autoCapitalize="none"
						autoCorrect={false}
						underlineColorAndroid="transparent"
						keyboardType="default"
						returnKeyType="search"
						placeholder={t('markAsSold.selectUserModal.searchUser')}
						onChangeText={setSearchTerm}
					/>
				</RectButton>
				{filteredUsers.length > 0 ? (
					<FlatList
						style={Styles.ListContainer}
						data={filteredUsers}
						keyExtractor={(item) => String(item.id)}
						renderItem={({ item }) => (
							<UserItem
								user={item}
								isSelected={item.id === selectedUser}
								onClick={(user_id) => setSelectedUser(user_id)}
							/>
						)}
						ItemSeparatorComponent={() => (
							<View style={Styles.Separator} />
						)}
					/>
				) : (
					<View style={[Styles.ListContainer, Styles.EmptyList]}>
						<Text>
							{t('markAsSold.selectUserModal.emptyUserList')}
						</Text>
					</View>
				)}

				<TouchableOpacity
					style={[
						Styles.ActionButton,
						!selectedUser && Styles.ActionButtonDisabled,
					]}
					onPress={closeModal}>
					<Text style={Styles.ActionButtonText}>
						{selectedUser ? (
							<Trans
								i18nKey="markAsSold.selectUserModal.actionButtonText"
								values={{
									username: selectedUserName,
								}}
							/>
						) : (
							t('markAsSold.selectUserModal.selectTheBuyer')
						)}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={closeModal}
					style={Styles.SecondaryButton}>
					<Text style={Styles.SecondaryButtonText}>
						{t('markAsSold.selectUserModal.secondaryButton')}
					</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</Modal>
	);
}

export default SelectUserModal;
