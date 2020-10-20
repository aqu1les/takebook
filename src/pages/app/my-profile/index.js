import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	ScrollView,
	ToastAndroid,
	RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './style';
import { RectButton } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import DefaultProfile from '../../../assets/icons/defaultProfile.svg';
import { useTranslation } from 'react-i18next';
import FieldText from './field-text/index';
import { Picker } from '@react-native-community/picker';
import { storeLanguage, updateUserInfo } from '../../../services/UserService';
import { setUserAction } from '../../../redux/actions/authentication';
import { getUser, updateUserAvatar } from './../../../services/UserService';
import ImageEditor from '../../../services/ImageEditor';
import ImagePicker from 'react-native-image-picker';
import { createFormData } from './../../../services/FormDataService';
import BottomSheet from 'reanimated-bottom-sheet';
import AddressForm from './../../auth/sign-up/address-form/index';

function MyProfile() {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const [loadingInfo, setLoadingInfo] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [newAvatar, setNewAvatar] = useState(null);
	const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
	const sheetRef = useRef(null);
	const [isAddressFormOpen, setAddFormOpen] = useState(false);

	function deleteAccount() {
		console.log('tem ctz?');
		console.log('delete account');
	}

	function onLanguageUpdate(value) {
		i18n.changeLanguage(value);
		storeLanguage(value);
	}

	function onNameChange(newName) {
		const [first_name, last_name] = newName.split(' ');

		if (!first_name || !last_name) {
			return;
		}

		updateUserField({
			first_name,
			last_name,
		});
	}

	async function updateUserField(data) {
		if (isUpdating) {
			return;
		}

		try {
			setIsUpdating(true);
			const response = await updateUserInfo(data);
			dispatch(
				setUserAction({
					...response.data,
				}),
			);

			ToastAndroid.show(t('profile.updateFeedback'), ToastAndroid.SHORT);

			return;
		} catch (err) {
			console.log(err.data);
			ToastAndroid.show(t('error.somethingWentWrong'), ToastAndroid.LONG);
		} finally {
			setIsUpdating(false);
		}
	}

	function selectPicture() {
		ImagePicker.showImagePicker(
			{
				title: t('profile.selectNewPicture'),
				cancelButtonTitle: t('global.cancel'),
				takePhotoButtonTitle: t('imagePicker.takePicture'),
				chooseFromLibraryButtonTitle: t('imagePicker.chooseLibrary'),
				storageOptions: {
					waitUntilSaved: true,
					privateDirectory: true,
				},
				mediaType: 'photo',
			},
			(response) => {
				if (response.didCancel) {
					console.log('User cancelled image picker');
				} else if (response.error) {
					console.log('ImagePicker Error: ', response.error);
				} else {
					setNewAvatar({
						uri: response.uri,
						type: response.type,
						fileName: response.fileName,
					});
				}
			},
		);
	}

	function editPicture() {
		ImageEditor(
			newAvatar.uri,
			(result) => {
				setNewAvatar({ ...newAvatar, uri: result });
			},
			() => {
				return;
			},
		);
	}

	async function updateImage() {
		if (isUpdatingAvatar) {
			return;
		}
		try {
			const data = createFormData([newAvatar], 'avatar_file', {});
			setIsUpdatingAvatar(true);
			const response = await updateUserAvatar(data);

			if (!response.data || response.data.error) {
				throw new Error('something went wrong');
			}

			dispatch(
				setUserAction({
					...response.data,
				}),
			);

			setNewAvatar(null);
		} catch (error) {
			console.log(error);
		} finally {
			setIsUpdatingAvatar(false);
		}
	}

	function removeUserPicture() {
		setNewAvatar(null);
	}

	async function reloadUserInfo() {
		if (loadingInfo) {
			return;
		}
		try {
			setLoadingInfo(true);
			const response = await getUser();

			dispatch(
				setUserAction({
					...response.data,
				}),
			);
		} catch (error) {
			console.log(error.data);
			ToastAndroid.show(t('error.somethingWentWrong'), ToastAndroid.LONG);
		} finally {
			setLoadingInfo(false);
		}
	}

	function openAddressForm() {
		setAddFormOpen(true);
		sheetRef.current.snapTo(2);
	}

	function updateUserAddress(data) {
		updateUserField({
			address: data,
		});
		closeAddressForm();
	}

	function closeAddressForm() {
		sheetRef.current.snapTo(0);
		setAddFormOpen(false);
	}

	return (
		<>
			<ScrollView
				style={Styles.Container}
				contentContainerStyle={Styles.ScrollContainer}
				refreshControl={
					<RefreshControl
						colors={['#fb8c00', '#38C2FF']}
						refreshing={loadingInfo}
						onRefresh={reloadUserInfo}
					/>
				}
				scrollEnabled={true}
				bounces={true}>
				<View style={Styles.AvatarContainer}>
					<View style={Styles.UserAvatar}>
						{user.avatar_url || newAvatar ? (
							<FastImage
								source={{
									uri: newAvatar
										? newAvatar.uri
										: user.avatar_url,
								}}
								style={Styles.UserPic}
							/>
						) : (
							<DefaultProfile height="100%" width="100%" />
						)}
						{!newAvatar && (
							<RectButton
								onPress={selectPicture}
								style={Styles.PicOverlay}>
								<MCI name="image-plus" color="#fff" size={30} />
							</RectButton>
						)}
					</View>
					{newAvatar && (
						<RectButton
							onPress={updateImage}
							style={Styles.UploadButton}>
							<MCI
								name="file-upload-outline"
								color="#fff"
								size={30}
							/>
						</RectButton>
					)}
					<View style={Styles.PicActionsContainer}>
						<RectButton
							enabled={!!newAvatar}
							onPress={editPicture}
							style={[
								Styles.EditButton,
								Styles.PicButton,
								Styles.EditPicButton,
								!newAvatar && Styles.PicButtonDisabled,
							]}>
							<FontAwesome name="edit" size={20} color="#fff" />
							<Text style={Styles.PicButtonText}>
								{t('profile.updatePic')}
							</Text>
						</RectButton>
						<RectButton
							enabled={!!newAvatar}
							onPress={removeUserPicture}
							style={[
								Styles.EditButton,
								Styles.PicButton,
								Styles.DeletePicButton,
								!newAvatar && Styles.PicButtonDisabled,
							]}>
							<FontAwesome
								name="trash-o"
								size={20}
								color="#fff"
							/>
							<Text style={Styles.PicButtonText}>
								{t('profile.deletePic')}
							</Text>
						</RectButton>
					</View>
				</View>

				<FieldText
					label={t('profile.name')}
					value={user.full_name}
					editable={true}
					onSubmit={onNameChange}
				/>

				<FieldText
					label={t('profile.email')}
					value={user.email}
					editable={true}
					onSubmit={(newEmail) =>
						updateUserField({ email: newEmail })
					}
				/>

				<View style={Styles.PickerContainer}>
					<Text style={Styles.InputLabel}>
						{t('profile.language')}
					</Text>
					<Picker
						style={Styles.Picker}
						prompt={t('profile.pickLanguage')}
						selectedValue={i18n.languages[0]}
						onValueChange={onLanguageUpdate}>
						<Picker.Item label={t('english')} value="en" />
						<Picker.Item label={t('portuguese')} value="pt" />
					</Picker>
				</View>

				<View style={Styles.HeadingRow}>
					<Text style={Styles.HeadingText}>
						{t('profile.address')}
					</Text>
					<RectButton
						onPress={openAddressForm}
						style={Styles.EditButton}>
						<FontAwesome name="edit" size={20} color="#000000" />
					</RectButton>
				</View>

				<FieldText
					label={t('addressForm.street')}
					value={user.address.street}
					editable={false}
				/>

				<FieldText
					label={t('addressForm.neighborhood')}
					value={user.address.neighborhood}
					editable={false}
				/>

				<FieldText
					label={t('addressForm.city')}
					value={user.address.city}
					editable={false}
				/>

				<FieldText
					label={t('addressForm.state')}
					value={user.address.state}
					editable={false}
				/>

				<FieldText
					label={t('addressForm.zipcode')}
					value={user.address.zip_code}
					editable={false}
				/>

				<RectButton onPress={deleteAccount} style={Styles.DeleteButton}>
					<FontAwesome name="trash-o" size={24} color="#FFF" />
					<Text style={Styles.DeleteButtonText}>
						{t('profile.deleteAccount')}
					</Text>
				</RectButton>
			</ScrollView>
			<BottomSheet
				ref={sheetRef}
				initialSnap={0}
				snapPoints={[0, 250, 350, 500]}
				borderRadius={10}
				onCloseEnd={() => {
					setAddFormOpen(false);
				}}
				renderContent={() => (
					<View style={Styles.BottomSheet}>
						{isAddressFormOpen && (
							<View>
								<View style={Styles.BottomSheetTracker} />
								<View style={[Styles.Row, Styles.SheetHeader]}>
									<Text style={Styles.SheetHeaderText}>
										{t('signUp.addressFormHeader')}
									</Text>
								</View>
								<AddressForm
									currentZipcode={user.address.zip_code}
									currentStreet={user.address.street}
									currentNeighborhood={
										user.address.neighborhood
									}
									currentCity={user.address.city}
									currentState={user.address.state}
									currentLatitude={user.address.latitude}
									currentLongitude={user.address.longitude}
									onDismiss={() => {
										setAddFormOpen(false);
									}}
									onSubmit={updateUserAddress}
								/>
							</View>
						)}
					</View>
				)}
			/>
		</>
	);
}

export default MyProfile;
