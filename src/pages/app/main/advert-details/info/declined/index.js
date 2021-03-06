import React from 'react';
import { View, Text } from 'react-native';
import Styles from './style';
import { Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

function Declined() {
	const { t } = useTranslation();
	return (
		<>
			<View style={[Styles.Row, Styles.StatusRow]}>
				<Text>{t('advertDetails.status') + ':'}</Text>
				<Chip
					style={[Styles.StatusChip, Styles.StatusChipDeclined]}
					textStyle={[
						Styles.StatusChipText,
						Styles.StatusChipTextDeclined,
					]}>
					{t('advertDetails.declined.declined')}
				</Chip>
			</View>

			<View style={Styles.InfoWrapper}>
				<Text style={Styles.InfoTitle}>
					{t('advertDetails.declined.infoTitle')}
				</Text>
				<Text style={Styles.InfoContent}>
					{t('advertDetails.declined.infoContent')}
				</Text>
			</View>
		</>
	);
}

export default Declined;
