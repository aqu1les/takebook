import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Styles from './style';
import ErrorAnimation from '../../../assets/animations/error.json';
import CloseIcon from '../../../assets/close.svg';

function FailedFeedback({ isVisible, handleModalHide, children }) {
	return (
		<Modal
			style={Styles.Modal}
			isVisible={isVisible}
			animationIn="zoomIn"
			animationOut="zoomOut">
			<View style={Styles.ModalCard}>
				<LottieView
					source={ErrorAnimation}
					autoPlay
					loop={false}
					style={Styles.Animation}
				/>
				<TouchableOpacity
					style={Styles.ModalClose}
					onPress={handleModalHide}>
					<CloseIcon />
				</TouchableOpacity>
				{children}
			</View>
		</Modal>
	);
}

export default memo(FailedFeedback);
