import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Styles from './style';
import BookModal from '../../../../../assets/book-modal.svg';
import CloseIcon from '../../../../../assets/close.svg';

export default FirstModal = ({ isVisible, handleHideModal, nextModal }) => {

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
                    Você está pronto para anunciar o seu livro?
            </Text>
                <BookModal />
                <Text style={Styles.TextP}>
                    É muito simples, são apenas 2 passos!
            </Text>
                <TouchableOpacity
                    style={Styles.ModalButton}
                    onPress={nextModal}>
                    <Text style={Styles.ModalButtonText}>
                        Vamos lá
                </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};
