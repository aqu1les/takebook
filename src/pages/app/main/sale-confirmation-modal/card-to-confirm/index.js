import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Styles from './style';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import DefaultProfile from '../../../../../assets/icons/defaultProfile.svg';

function CardToConfirm({ book, loading, reject, confirm }) {
	const { t } = useTranslation();

	return (
		<View style={Styles.Container}>
			<View style={Styles.OwnerInfoRow}>
				{book.owner.avatar_url ? (
					<FastImage
						source={{ uri: book.owner.avatar_url }}
						style={Styles.OwnerAvatar}
					/>
				) : (
					<DefaultProfile height="60%" />
				)}
				<View style={Styles.OwnerInfo}>
					<Text style={Styles.OwnerText}>
						<Text style={Styles.BoldText}>
							{t('saleConfirmationModal.owner')}:{' '}
						</Text>
						{book.owner.full_name}
					</Text>
					<Text>
						<Text style={Styles.BoldText}>
							{t('saleConfirmationModal.bookTitle')}:{' '}
						</Text>
						{book.title}
					</Text>
				</View>
			</View>
			<View style={Styles.CoverContainer}>
				<FastImage
					source={{ uri: book.covers_url[0].url }}
					style={Styles.Cover}
				/>
			</View>

			<View
				style={[Styles.ActionsRow, loading && Styles.ActionsRowCenter]}>
				{loading ? (
					<ActivityIndicator color="#f98b0d" size={36} />
				) : (
					<>
						<TouchableOpacity
							onPress={reject}
							style={Styles.SecondaryButton}>
							<Text style={Styles.SecondaryButtonText}>
								{t('saleConfirmationModal.secondaryAction')}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={confirm}
							style={Styles.ActionButton}>
							<Text style={Styles.ActionButtonText}>
								{t('saleConfirmationModal.primaryAction')}
							</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
		</View>
	);
}

export default CardToConfirm;
