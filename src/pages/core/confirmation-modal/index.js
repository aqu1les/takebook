import React, { memo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import Styles from './style';
import CloseIcon from '../../../assets/close.svg';
import { useTranslation } from 'react-i18next';

function ConfirmationModal({
	isVisible,
	handleModalHide,
	confirmationText,
	denyLabel,
	confirmLabel,
	onConfirm,
	onReject,
	title,
}) {
	const { t } = useTranslation();

	return (
		<Modal
			style={Styles.Modal}
			isVisible={isVisible}
			animationIn="zoomIn"
			animationOut="zoomOut">
			<View style={Styles.ModalCard}>
				<TouchableOpacity
					style={Styles.ModalClose}
					onPress={handleModalHide}>
					<CloseIcon />
				</TouchableOpacity>

				<View style={Styles.ContentWrapper}>
					<Text style={Styles.Title}>
						{title || t('confirmationModal.title')}
					</Text>
					<Text style={Styles.Contet}>
						{confirmationText || t('confirmationModal.content')}
					</Text>
				</View>

				<View style={Styles.Actions}>
					<TouchableOpacity style={Styles.Deny} onPress={onReject}>
						<Text style={Styles.DenyText}>
							{denyLabel || t('confirmationModal.reject')}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={Styles.Confirm}
						onPress={onConfirm}>
						<Text style={Styles.ConfirmText}>
							{confirmLabel || t('confirmationModal.confirm')}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

export default memo(ConfirmationModal);
