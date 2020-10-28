import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, ActivityIndicator, ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import Styles from './style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTranslation, Trans } from 'react-i18next';
import { RectButton } from 'react-native-gesture-handler';
import { markAdvertAsSold } from './../../../../../../services/AdvertsService';
import { loadSingleAdvert } from './../../../../../../redux/actions/advert';
import { formatToLocale } from './../../../../../../helpers/Date';

function ApprovedInfo({ advert }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [loading, setIsLoading] = useState(false);
	const isMounted = useRef(true);

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	const formattedSellDate = useMemo(
		() =>
			advert.sold_at
				? formatToLocale(advert.sold_at, 'HH:mm DD-MM-YYYY')
				: false,
		[advert],
	);

	async function markBookAsSold() {
		if (loading) {
			return false;
		}

		setIsLoading(true);

		try {
			await markAdvertAsSold(advert.id);

			dispatch(loadSingleAdvert(advert.id));
			ToastAndroid.show('Livro editado com sucesso!', ToastAndroid.SHORT);
		} catch (error) {
			ToastAndroid.show('Erro atualizando o livro', ToastAndroid.LONG);
		} finally {
			if (isMounted.current) {
				setIsLoading(false);
			}
		}
	}

	if (!formattedSellDate) {
		return (
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
				<RectButton onPress={markBookAsSold} style={Styles.Button}>
					{loading ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={Styles.ButtonText}>
							{t('advertDetails.approvedSection.markAsSold')}
						</Text>
					)}
				</RectButton>
			</View>
		);
	}

	const splitDate = formattedSellDate.split(' ');
	return (
		<View style={Styles.Container}>
			<Text style={Styles.TitleText}>
				{t('advertDetails.soldSection.congrats')}
			</Text>
			<View style={Styles.InfoAlert}>
				<Text style={Styles.InfoAlertText}>
					<Trans
						i18nKey="advertDetails.soldSection.info"
						values={{
							date: splitDate[1],
							hours: splitDate[0],
						}}
					/>
				</Text>
			</View>
		</View>
	);
}

export default ApprovedInfo;
