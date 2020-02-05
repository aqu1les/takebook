import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Style from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default NewBook = (props) => {
    const [cover, setCover] = useState(null);
    const [backCover, setBackCover] = useState();

    const previewCover = useMemo(() => cover ? 'data:image/jpeg;base64,' + cover.data : null, [cover]);
    const previewBackCover = useMemo(() => backCover ? 'data:image/jpeg;base64,' + backCover.data : null, [backCover]);

    function handleCoverPicker() {
        ImagePicker.showImagePicker({ title: 'Camera' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setCover(response);
            }
        });
    }
    function handleBackCoverPicker() {
        ImagePicker.showImagePicker({ title: 'Camera' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setBackCover(response);
            }
        });
    }
    return (
        <View style={Style.Container}>
            <View style={Style.Card}>
                <Text style={Style.HeadingText}>Selecione as fotos ou use a câmera</Text>
                <View style={Style.CoverContainer}>
                    {cover ?
                        <Image source={{ uri: previewCover }} style={Style.Cover} />
                        :
                        <View style={[Style.Cover, Style.ImageHolder]} onTouchEnd={handleCoverPicker}></View>
                    }
                    {backCover ?
                        <Image source={{ uri: previewBackCover }} style={Style.BackCover} />
                        :
                        <View style={[Style.BackCover, Style.ImageHolder]} onTouchEnd={handleBackCoverPicker}></View>
                    }
                </View>
                <Text style={{ textAlign: 'center' }}>Clique nos campos para adicionar a capa e a contra capa respectivamente</Text>
                <TouchableOpacity style={Style.NextPageButton}>
                    <Text style={Style.NextPageText}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}