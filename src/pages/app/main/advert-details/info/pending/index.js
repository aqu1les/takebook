import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Styles from './style';
import BookInfoForm from './../not-approved/book-form/index';
import { RectButton } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

function Pending({ advert }) {
	const { t } = useTranslation();
	const [infoOpen, setInfoOpen] = useState(false);

	function showInfo() {
		setInfoOpen((v) => !v);
	}

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={Styles.Wrapper}
			contentContainerStyle={Styles.ScrollContainer}>
			<View style={[Styles.InfoContainer, Styles.Warn]}>
				<Text style={Styles.WarnText}>
					{t('advertDetails.pending.warning')}
				</Text>
			</View>

			<View style={[Styles.Row, Styles.SituationRow]}>
				<Text style={Styles.SimpleText}>
					{t('advertDetails.status') + ':'}
				</Text>
				<RectButton onPress={showInfo} style={Styles.Button}>
					<Chip
						style={[Styles.StatusChip, Styles.StatusChipPending]}
						textStyle={[
							Styles.StatusChipText,
							Styles.StatusChipTextPending,
						]}>
						{t('advertDetails.pending.reviewing')}
					</Chip>
				</RectButton>
			</View>
			{infoOpen && (
				<View style={[Styles.InfoContainer, Styles.Info]}>
					<Text style={Styles.InfoText}>
						{t('advertDetails.pending.reviewHelp')}
					</Text>
				</View>
			)}

			<View style={Styles.HorizontalDivider} />

			<BookInfoForm advert={advert} />
		</ScrollView>
	);
}

export default Pending;
