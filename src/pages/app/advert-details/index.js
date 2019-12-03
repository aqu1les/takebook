import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import Background from '../../../assets/background/advertDetailbg.svg';

export default AdvertDetails = ({ navigation }) => {
    const advert = navigation.getParam('advert', undefined);
    if (advert === undefined) return navigation.navigate('Home');
    const [currentImg, setCurrentImg] = useState(0);
    const [activeSession, setActiveSession] = useState(0);

    function changeImg() {
        let next = currentImg + 1;
        next = next > advert.covers_url.length - 1 ? 0 : next;
        setCurrentImg(next);
    }
    function onSectionChange(index) {
        setActiveSession(index);
    }
    return (
        <View style={Styles.Page}>
            <View style={Styles.CoverContainer}>
                <Background width={'90%'} height={'90%'} style={Styles.BackgroundSvg} />
                <Icon name="heart" size={24} color='#e64c3c' style={Styles.FavIcon} />
                <TouchableOpacity activeOpacity={0.9} style={Styles.ImgCoverContainer} onPress={changeImg}>
                    <Image source={{ uri: advert.covers_url[currentImg].url }} style={Styles.ImgCover} />
                </TouchableOpacity>
            </View>
            <View style={Styles.InfoContainer}>
                <Text>{advert.title}</Text>
                <Text>{advert.author}</Text>
                <Text>R$ {advert.price}</Text>
            </View>
            <View style={Styles.InfoSections}>
                <Animated.Text
                    onPress={() => setActiveSession(0)}
                    style={[Styles.SectionText, activeSession == 0 && Styles.SectionTextActive]}
                    on
                >
                    Descrição
                </Animated.Text>
                <Animated.Text
                    onPress={() => setActiveSession(1)}
                    style={[Styles.SectionText, activeSession == 1 && Styles.SectionTextActive]}>
                    Localização
                </Animated.Text>
                <Animated.Text
                    onPress={() => setActiveSession(2)}
                    style={[Styles.SectionText, activeSession == 2 && Styles.SectionTextActive]}>
                    Contato
                </Animated.Text>
            </View>
            <Swiper
                showsPagination={false} horizontal={true}
                containerStyle={Styles.SectionContent}
                onIndexChanged={onSectionChange}
                loop={false}
            >
                <Text>{advert.description}</Text>
                <Text>1</Text>
                <Text>2</Text>
            </Swiper>
        </View>
    )
}