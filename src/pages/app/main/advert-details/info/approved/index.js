import React from 'react';
import { View } from 'react-native';
import Styles from './style';
import { Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

function ApprovedInfo({ advert }) {
	const { t } = useTranslation();

	return (
		<Chip
			style={[Styles.StatusChip, Styles.StatusChipApproved]}
			textStyle={[Styles.StatusChipText, Styles.StatusChipTextApproved]}>
			{t('advertDetails.approved.approved')}
		</Chip>
	);
}

export default ApprovedInfo;
