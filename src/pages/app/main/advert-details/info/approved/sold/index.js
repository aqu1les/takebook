import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import Styles from './style';
import { formatToLocale } from './../../../../../../../helpers/Date';
import { useTranslation, Trans } from 'react-i18next';

function SoldAdvert({ advert }) {
	const { t } = useTranslation();
	const formattedSellDate = useMemo(
		() =>
			advert.solded_at
				? formatToLocale(advert.solded_at, 'HH:mm DD-MM-YYYY')
				: false,
		[advert],
	);

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

export default SoldAdvert;
