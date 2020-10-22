import React, { useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Chip } from 'react-native-paper';
import { Tab, Tabs } from 'native-base';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Styles from './style';
import LikeButton from '../../components/like-button';
import Background from '../../../../assets/background/advertDetailbg.svg';
import DefaultProfile from '../../../../assets/icons/defaultProfile.svg';
import { handleLikeAction } from '../../../../redux/actions/fav';
import { RectButton } from 'react-native-gesture-handler';
import { deleteAdvert } from '../../../../services/AdvertsService';
import SuccessFeedback from '../../../core/success-feedback';
import { createRoom } from './../../../../services/ChatService';
import { onNewChat } from '../../../../redux/actions/chat';
import BottomSheet from 'reanimated-bottom-sheet';
import ApprovedInfo from './info/approved/index';
import NotApprovedInfo from './info/not-approved/index';

const AdvertDetails = ({ route }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { t } = useTranslation();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const { advertId } = route.params;
	const advert = useSelector(
		(state) =>
			state.adverts.data.find((ad) => ad.id === advertId) ||
			state.myads.data.find((ad) => ad.id === advertId),
		(prev, n) => {
			return false;
		},
	);
	const loggedUser = useSelector((state) => state.auth);
	const chats = useSelector((state) => state.chats.chats);
	const sheetRef = useRef(null);

	const belongsToViewer = useMemo(() => loggedUser.id === advert.owner.id, [
		advert.owner.id,
		loggedUser.id,
	]);

	async function contactSeller() {
		const room = chats.find((chat) => chat.user.id === advert.owner.id);

		if (room) {
			return goToChat();
		} else {
			try {
				const response = await createRoom(
					advert.owner.id,
					t('chats.firstMessage'),
				);
				dispatch(onNewChat(response.data));

				goToChat();
			} catch (error) {
				console.log('deu nao');
			}
		}
	}

	function goToChat() {
		navigation.navigate('Chats', {
			screen: 'RoomList',
			params: {
				user: advert.owner,
			},
		});
	}

	async function handleDelete() {
		await deleteAdvert(advertId);
		setShowSuccessModal(true);
	}

	function handleModalHide() {
		setShowSuccessModal(false);
		navigation.navigate('MyAds');
	}

	function handleLike() {
		dispatch(handleLikeAction(advert.id));
	}

	function openUpdateForm() {
		if (belongsToViewer && sheetRef.current) {
			sheetRef.current.snapTo(3);
		}
	}

	return (
		<>
			<View style={Styles.Page}>
				<View style={Styles.CoverContainer}>
					<Background
						width={'90%'}
						height={'90%'}
						style={Styles.BackgroundSvg}
					/>
					{belongsToViewer ? (
						<View style={Styles.ActionButtonsContainer}>
							<RectButton
								onPress={handleDelete}
								style={Styles.IconButton}>
								<Icon
									size={24}
									name="trash-o"
									color="#ff6868"
								/>
							</RectButton>
							<RectButton
								onPress={openUpdateForm}
								style={[Styles.IconButton, { marginLeft: 3 }]}>
								<Icon size={24} name="edit" color="#3877ff" />
							</RectButton>
						</View>
					) : (
						<LikeButton
							liked={advert.viewer_liked}
							style={Styles.IconButton}
							onPress={handleLike}
						/>
					)}
					<Swiper
						containerStyle={Styles.ImgCoverContainer}
						activeDotColor="#FB8C00">
						{advert.covers_url.map((cover) => (
							<FastImage
								source={{ uri: cover.url }}
								key={cover.url + cover.id}
								style={Styles.ImgCover}
							/>
						))}
					</Swiper>
				</View>
				<View style={Styles.InfoContainer}>
					<Text style={Styles.Title}>{advert.title}</Text>
					<View style={Styles.AuthorRow}>
						<Text style={Styles.Author}>{advert.author}</Text>
						<Text style={Styles.Price}>R$ {advert.price}</Text>
					</View>
					<View style={Styles.Row}>
						{advert.categories.map((cat, index) => (
							<Chip
								key={cat.id}
								style={Styles.Chip}
								textStyle={Styles.ChipText}>
								{cat.name}
							</Chip>
						))}
					</View>
				</View>
				<Tabs
					initialPage={0}
					tabBarUnderlineStyle={Styles.TabUnderline}>
					<Tab
						heading={t('advertDetails.tabs.description')}
						textStyle={Styles.TabHeadingText}
						tabStyle={Styles.TabHeading}
						activeTabStyle={Styles.SectionTextActive}
						activeTextStyle={Styles.SectionTextActive}>
						<View style={Styles.SectionContent}>
							<Text>{advert.description}</Text>
						</View>
					</Tab>
					{/* <Tab
                        heading={t('advertDetails.tabs.localization')}
                        textStyle={Styles.TabHeadingText}
                        tabStyle={Styles.TabHeading}
                        activeTabStyle={Styles.SectionTextActive}
                        activeTextStyle={Styles.SectionTextActive}>
                        <View style={Styles.SectionContentRow}>
                            <View style={Styles.RowLeftSide} />
                            <View style={Styles.RowRightSide} />
                        </View>
                    </Tab> */}
					<Tab
						heading={t('advertDetails.tabs.contact')}
						textStyle={Styles.TabHeadingText}
						tabStyle={Styles.TabHeading}
						activeTabStyle={Styles.SectionTextActive}
						activeTextStyle={Styles.SectionTextActive}>
						<View style={Styles.SectionContentRow}>
							<View style={Styles.RowLeftSide}>
								<View style={Styles.ElipseAvatar}>
									{advert.owner.avatar_url ? (
										<FastImage
											source={{
												uri: advert.owner.avatar_url,
											}}
											style={Styles.UserAvatar}
										/>
									) : (
										<DefaultProfile
											height="90%"
											width="90%"
										/>
									)}
								</View>
							</View>
							<View style={Styles.RowRightSide}>
								<Text
									style={
										Styles.UserName
									}>{`${advert.owner.first_name} ${advert.owner.last_name}`}</Text>
								{/* <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: 40,
                                        elevation: 3,
                                    }}>
                                    <Icon
                                        name="star"
                                        color="#ffff00"
                                        size={16}
                                    />
                                    <Text style={{}}>4.8</Text>
                                </View> */}
								{/* <TouchableOpacity
                                    style={{}}
                                    onPress={() => console.log('Ver Perfil')}>
                                    <Text style={{}}>
                                        {t('advertDetails.profile.button')}
                                    </Text>
                                </TouchableOpacity> */}
								<TouchableOpacity
									style={[
										Styles.MessageButton,
										loggedUser.id === advert.owner.id &&
											Styles.MessageButtonDisabled,
									]}
									onPress={contactSeller}
									disabled={
										loggedUser.id === advert.owner.id
									}>
									<Text style={Styles.ButtonText}>
										{t('advertDetails.profile.talk')}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Tab>
				</Tabs>
			</View>
			<SuccessFeedback
				isVisible={showSuccessModal}
				handleModalHide={handleModalHide}>
				<Text style={Styles.TextH1}>{t('success')}</Text>
				<Text style={Styles.TextP}>
					{t('advertList.onRemoveSuccessText')}
				</Text>
				<TouchableOpacity
					style={Styles.ModalButton}
					onPress={handleModalHide}>
					<Text style={Styles.ButtonTextModal}>{t('back')}</Text>
				</TouchableOpacity>
			</SuccessFeedback>
			{belongsToViewer && (
				<BottomSheet
					enabledInnerScrolling={true}
					ref={sheetRef}
					initialSnap={0}
					snapPoints={[0, 250, 350, 500, '90%']}
					borderRadius={10}
					onCloseEnd={() => {}}
					renderContent={() => (
						<View style={Styles.BottomSheet}>
							<View style={Styles.BottomSheetTracker} />
							<View style={Styles.SheetHeaderContainer}>
								<View style={[Styles.Row, Styles.SheetHeading]}>
									<Text style={Styles.SheetHeadText}>
										{t('advertDetails.aditionalInfo')}
									</Text>
								</View>
								{advert.status_id === 2 ? (
									<ApprovedInfo advert={advert} />
								) : (
									<NotApprovedInfo advert={advert} />
								)}
							</View>
						</View>
					)}
				/>
			)}
		</>
	);
};

export default AdvertDetails;
