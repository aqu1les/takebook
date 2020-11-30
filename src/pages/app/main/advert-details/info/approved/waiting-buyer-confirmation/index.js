import React from 'react';
import { View, Text } from 'react-native';
import Styles from './style';
import { useTranslation } from 'react-i18next';

function WaitingBuyerConfirmation({ advert }) {
	const { t } = useTranslation();

	return (
		<View style={Styles.Container}>
			<Text style={Styles.InfoText}>
				{t('markAsSold.waitingBuyerConfirmation')}
			</Text>
		</View>
	);
}

export default WaitingBuyerConfirmation;
