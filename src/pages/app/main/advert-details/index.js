import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Tab, Tabs } from 'native-base';
import Styles from './style';
import LikeButton from '../../components/like-button';
import Background from '../../../../assets/background/advertDetailbg.svg';
import DefaultProfile from '../../../../assets/icons/defaultProfile.svg';
import { likeBook, unlikeBook } from '../../../../services/LikeService';

export default AdvertDetails = ({ navigation }) => {
    const advert = navigation.getParam('advert');
    const user = navigation.getParam('logged_user');
    const [liked, setLiked] = useState(navigation.getParam('liked'));


    function contactSeller() {
        navigation.navigate({ routeName: 'Room', params: { user: advert.user } });
    }

    async function handleLike() {
        if (liked) {
            await unlikeBook(advert.id);
            setLiked(false);
        } else {
            await likeBook(advert.id);
            setLiked(true);
        }
    }

    return (
        <View style={Styles.Page}>
            <View style={Styles.CoverContainer}>
                <Background width={'90%'} height={'90%'} style={Styles.BackgroundSvg} />
                <LikeButton liked={liked} style={Styles.IconButton} onPress={handleLike} />
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
                    {advert.categories.map((cat, index) => (
                        <Text key={cat.id} style={[Styles.Category, index === 0 ? { marginLeft: 0 } : { marginHorizontal: 5 }]}>{cat.name}</Text>
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
                            <Text style={{ fontSize: 20, color: '#ff7719', fontWeight: 'bold' }}>{`${advert.user.first_name} ${advert.user.last_name}`}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 40, elevation: 3 }}>
                                <Icon name='star' color='#ffff00' size={16} />
                                <Text style={{}}>4.8</Text>
                            </View>
                            <TouchableOpacity style={{}} onPress={() => console.log('Ver Perfil')}>
                                <Text style={{}}>Ver Perfil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.MessageButton} onPress={contactSeller}>
                                <Text style={Styles.ButtonText}>Entrar em contato</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Tab>
            </Tabs>
        </View>
    );
}