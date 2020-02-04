import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './style';
import Background from '../../../../assets/background/advertDetailbg.svg';
import { Tab, Tabs } from 'native-base';
import DefaultProfile from '../../../../assets/icons/defaultProfile.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default AdvertDetails = ({ navigation }) => {
    const advert = navigation.getParam('advert');

    function contactSeller() {
        navigation.navigate({ routeName: 'Room', params: { user: advert.user } });
    }
    return (
        <View style={Styles.Page}>
            <View style={Styles.CoverContainer}>
                <Background width={'90%'} height={'90%'} style={Styles.BackgroundSvg} />
                <Icon name='heart' size={24} color='#e64c3c' style={Styles.FavIcon} />
                <Swiper containerStyle={Styles.ImgCoverContainer} activeDotColor='#FB8C00'>
                    {advert.covers_url.map(cover => (
                        <Image source={{ uri: cover.url }} key={cover.url + cover.id} style={Styles.ImgCover} />
                    ))}
                </Swiper>
            </View>
            <View style={Styles.InfoContainer}>
                <Text style={Styles.Title}>{advert.title}</Text>
                <Text style={Styles.Price}>R$ {advert.price}</Text>
                <Text style={Styles.Author}>{advert.author}</Text>
                <View style={Styles.Row}>
                    {advert.categories.map(cat => (
                        <Text key={cat.id} style={Styles.Category}>{cat.name}</Text>
                    ))}
                </View>
            </View>
            <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: '#FB8C00' }}>
                <Tab
                    heading='Descrição'
                    textStyle={Styles.TabHeadingText}
                    tabStyle={Styles.TabHeading}
                    activeTabStyle={Styles.SectionTextActive}
                    activeTextStyle={Styles.SectionTextActive}>
                    <View style={Styles.SectionContent}>
                        <Text>{advert.description}</Text>
                    </View>
                </Tab>
                <Tab
                    heading='Localização'
                    textStyle={Styles.TabHeadingText}
                    tabStyle={Styles.TabHeading}
                    activeTabStyle={Styles.SectionTextActive}
                    activeTextStyle={Styles.SectionTextActive}>
                    <View style={Styles.SectionContentRow}>
                        <View style={Styles.RowLeftSide}></View>
                        <View style={Styles.RowRightSide}></View>
                    </View>
                </Tab>
                <Tab
                    heading='Contato'
                    textStyle={Styles.TabHeadingText}
                    tabStyle={Styles.TabHeading}
                    activeTabStyle={Styles.SectionTextActive}
                    activeTextStyle={Styles.SectionTextActive}>
                    <View style={Styles.SectionContentRow}>
                        <View style={Styles.RowLeftSide}>
                            <View style={Styles.ElipseAvatar}>
                                {advert.user.avatar_url ?
                                    <Image source={{ uri: user.avatar_url }} height='90%' width='90%' /> :
                                    <DefaultProfile height='90%' width='90%' />}
                            </View>
                        </View>
                        <View style={Styles.RowRightSide}>
                            <TouchableOpacity style={Styles.MessageButton} onPress={contactSeller}>
                                <Text style={Styles.ButtonText}>Entrar em contato</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Tab>
            </Tabs>
        </View>
    )
}