import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Styles from './style';
import ErrorAnimation from '../../../assets/animations/error.json';
import CloseIcon from '../../../assets/close.svg';

export default function FailedFeedback({ isVisible, handleModalHide, children }) {
    return (
        <Modal style={Styles.Modal} isVisible={isVisible} animationIn='zoomIn' animationOut='zoomOut'>
            <View style={Styles.ModalCard}>
                <LottieView source={ErrorAnimation} autoPlay loop={false} style={{ width: 150, height: 150 }} />
                <TouchableOpacity
                    style={Styles.ModalClose}
                    onPress={handleModalHide}>
                    <CloseIcon />
                </TouchableOpacity>
            </View>
        </Modal>
    );
}