import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Styles from './style';
import OkAnimation from '../../../assets/animations/ok.json';
import CloseIcon from '../../../assets/close.svg';

function SuccessFeedback({ children, isVisible, handleModalHide }) {
	return (
		<Modal
			style={Styles.Modal}
			isVisible={isVisible}
			animationIn="zoomIn"
			animationOut="zoomOut">
			<View style={Styles.ModalCard}>
				<LottieView
					source={OkAnimation}
					autoPlay
					loop={false}
					style={{ width: 150, height: 150 }}
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

export default memo(SuccessFeedback);
