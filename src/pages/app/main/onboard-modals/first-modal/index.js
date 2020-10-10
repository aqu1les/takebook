import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
import Styles from './style';
import BookModal from '../../../../../assets/book-modal.svg';
import CloseIcon from '../../../../../assets/close.svg';

export default function FirstModal({ isVisible, handleHideModal, nextModal }) {
	const { t } = useTranslation();

	return (
		<Modal
			style={Styles.Modal}
			isVisible={isVisible}
			animationIn="zoomIn"
			animationOut="slideOutLeft">
			<View style={Styles.ModalCard}>
				<TouchableOpacity
					style={Styles.ModalClose}
					onPress={handleHideModal}>
					<CloseIcon />
				</TouchableOpacity>
				<Text style={Styles.TextHeader}>
					{t('onboardModals.first.header')}
				</Text>
				<BookModal />
				<Text style={Styles.TextP}>
					{t('onboardModals.first.content')}
				</Text>
				<TouchableOpacity
					style={Styles.ModalButton}
					onPress={nextModal}>
					<Text style={Styles.ModalButtonText}>
						{t('onboardModals.first.button')}
					</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}
