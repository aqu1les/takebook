import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import en from 'date-fns/locale/en-US';
import { Badge } from 'native-base';
import Styles from './style';
import defaultBook from '../../../../../assets/bookDefault.jpg';
import LikeButton from '../../../components/like-button';
import { handleLikeAction } from '../../../../../redux/actions/fav';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RectButton } from 'react-native-gesture-handler';
import { deleteAdvert } from '../../../../../services/AdvertsService';
import SuccessFeedback from '../../../../core/success-feedback';

function Advert({ item }) {
	const dispatch = useDispatch();
	const { t, i18n } = useTranslation();
	const navigation = useNavigation();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const {
		id,
		title,
		price,
		author,
		categories,
		condition_id,
		covers_url,
		approved_at,
		viewer_liked = 0,
		owner,
		status_id,
		created_at,
	} = item;
	let condition;
	let badgeColor;
	let bookBorder = status_id === 2 ? '#ffffff' : '#E12A19';
	const loggedUser = useSelector((state) => state.auth);

	switch (condition_id) {
		case 1:
			condition = t('new');
			badgeColor = '#00cc09';
			break;
		case 2:
			condition = t('semiNew');
			badgeColor = '#38c2ff';
			break;
		case 3:
			condition = t('used');
			badgeColor = '#ff3d00';
			break;
		default:
			break;
	}

	function handleClick() {
		navigation.navigate('AdvertDetails', {
			advertId: item.id,
		});
	}

	async function handleLike() {
		dispatch(handleLikeAction(id));
	}

	async function handleDelete() {
		setShowSuccessModal(true);
		await deleteAdvert(id);
	}

	function handleModalHide() {
		setShowSuccessModal(false);
		navigation.navigate('MyAds');
	}

	return (
		<>
			<View
				style={[
					Styles.Card,
					status_id === 1
						? { backgroundColor: '#e5e5e5' }
						: { borderColor: bookBorder, borderWidth: 1 },
				]}
				activeOpacity={0.8}>
				<TouchableOpacity style={Styles.Cover} onPress={handleClick}>
					<FastImage
						source={
							covers_url.length > 0
								? { uri: covers_url[0].url }
								: defaultBook
						}
						style={Styles.ImgCover}
					/>
				</TouchableOpacity>
				<View style={Styles.Infos}>
					<Text style={Styles.Title}>{title}</Text>
					<Text style={Styles.Author}>
						<Text style={Styles.AuthorTitle}>
							{t('advertList.advert.author') + ': '}
						</Text>
						{author}
					</Text>
					<View style={Styles.Categories}>
						{categories.map(({ id, name }) => (
							<Text key={`tc-${id}`} style={Styles.TextCategory}>
								{name}
							</Text>
						))}
					</View>
					<View style={Styles.Details}>
						<Badge
							style={[
								Styles.Badge,
								{ backgroundColor: badgeColor },
							]}>
							<Text style={Styles.Condition}>{condition}</Text>
						</Badge>
						{/* <View style={Styles.Row}>
                            <Text style={Styles.TextCategory}>
                                {t('advertList.advert.locale')}:{' '}
                            </Text>
                            <Text style={Styles.Locale}>
                                {owner.address_city} - {owner.address_state}
                            </Text>
                        </View> */}
					</View>
					<View style={Styles.PriceButton}>
						<Text style={Styles.Price}>R$ {String(price)}</Text>
					</View>
					{loggedUser.id === owner.id ? (
						<RectButton
							onPress={handleDelete}
							style={Styles.TrashBtn}>
							<Icon size={20} name="trash" color="#666666" />
						</RectButton>
					) : (
						<LikeButton
							liked={viewer_liked}
							style={Styles.LikeBtn}
							onPress={handleLike}
						/>
					)}

					<Text style={Styles.CreationTime}>
						{formatDistance(
							new Date(approved_at || created_at),
							Date.now(),
							{
								addSuffix: true,
								locale: i18n.language === 'pt' ? pt : en,
							},
						)}
					</Text>
				</View>
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
					<Text style={Styles.ButtonText}>{t('back')}</Text>
				</TouchableOpacity>
			</SuccessFeedback>
		</>
	);
}

export default Advert;
