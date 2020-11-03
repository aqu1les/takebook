import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import Styles from './style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { RectButton } from 'react-native-gesture-handler';
import { markAdvertAsSold } from './../../../../../../services/AdvertsService';
import { loadSingleAdvert } from './../../../../../../redux/actions/advert';
import SelectUserModal from './select-user-modal/index';
import WaitingBuyerConfirmation from './waiting-buyer-confirmation/index';
import SoldAdvert from './sold/index';

function ApprovedInfo({ advert }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [loading, setIsLoading] = useState(false);
	const isMounted = useRef(true);
	const [isSelectingUser, setIsSelectingUser] = useState(false);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	if (advert.status_id === 5) {
		return <WaitingBuyerConfirmation advert={advert} />;
	} else if (advert.status_id === 4) {
		return <SoldAdvert advert={advert} />;
	}

	function finishedSelectingUser({ userId = null }) {
		setIsSelectingUser(false);
		markBookAsSold(userId);
	}

	async function markBookAsSold(userId = null) {
		if (loading) {
			return false;
		}

		setIsLoading(true);

		try {
			await markAdvertAsSold(advert.id, userId);

			dispatch(loadSingleAdvert(advert.id));
			ToastAndroid.show(
				t('advertDetails.update.successFeedback'),
				ToastAndroid.SHORT,
			);
		} catch (error) {
			ToastAndroid.show(
				t('advertDetails.update.errorFeedback'),
				ToastAndroid.LONG,
			);
		} finally {
			if (isMounted.current) {
				setIsLoading(false);
			}
		}
	}

	return (
		<>
			<View style={Styles.Container}>
				<View style={Styles.InfoAlert}>
					<Text style={Styles.InfoAlertText}>
						{t('advertDetails.approvedSection.info')}
					</Text>
				</View>
				<View style={Styles.HelpContainer}>
					<FeatherIcon name="info" size={20} color="#424242" />
					<Text style={Styles.HelpText}>
						{t('advertDetails.approvedSection.help')}
					</Text>
				</View>
				<RectButton
					onPress={() => setIsSelectingUser(true)}
					style={Styles.Button}>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={Styles.ButtonText}>
							{t('advertDetails.approvedSection.markAsSold')}
						</Text>
					)}
				</RectButton>
			</View>
			<SelectUserModal
				isVisible={isSelectingUser}
				onCloseModal={finishedSelectingUser}
			/>
		</>
	);
}

export default ApprovedInfo;
