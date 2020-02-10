import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Styles from './style';
import CloseIcon from '../../../../../assets/close.svg';
import DefaultBook from '../../../../../assets/bookDefault.jpg';

export default SecondModal = ({ isVisible, handleHideModal, navigateToForm }) => {

    return (
        <Modal
            style={Styles.Modal}
            isVisible={isVisible}
            animationIn="slideInRight"
            animationOut="zoomOut">
            <View style={[Styles.ModalCard, { height: 490 }]}>
                <TouchableOpacity
                    style={Styles.ModalClose}
                    onPress={handleHideModal}>
                    <CloseIcon />
                </TouchableOpacity>
                <Text style={Styles.TextHeader}>Tire fotos!</Text>
                <View style={Styles.Divider}></View>
                <Text style={Styles.Texplanation}>
                    Será necessário a foto da capa e contracapa.
                    Utilize suas melhores técnicas como fotógrafo
                    para o seu anúncio ficar mais atraente :D
                </Text>
                <Image source={DefaultBook} style={{
                    width: 140,
                    height: 210,
                    borderRadius: 8,
                }}
                />
                <TouchableOpacity
                    style={Styles.Modal2Button}
                    onPress={navigateToForm}>
                    <Icon
                        name="chevron-right"
                        size={30}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

