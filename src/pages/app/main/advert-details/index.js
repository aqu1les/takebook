import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Chip } from 'react-native-paper';
import { Tab, Tabs } from 'native-base';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import Styles from './style';
import LikeButton from '../../components/like-button';
import Background from '../../../../assets/background/advertDetailbg.svg';
import DefaultProfile from '../../../../assets/icons/defaultProfile.svg';
import { handleLikeAction } from '../../../../redux/actions/fav';
import { RectButton } from 'react-native-gesture-handler';
import { deleteAdvert } from '../../../../services/AdvertsService';
import SuccessFeedback from '../../../core/success-feedback';
import { createRoom } from './../../../../services/ChatService';
import { onNewChat } from '../../../../redux/actions/chat';

const AdvertDetails = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { advertId } = route.params;
    const advert = useSelector(
        state =>
            state.adverts.data.find(ad => ad.id === advertId) ||
            state.myads.data.find(ad => ad.id === advertId),
        (prev, n) => {
            return false;
        },
    );
    const loggedUser = useSelector(state => state.auth);
    const chats = useSelector(state => state.chats.chats);

    async function contactSeller() {
        const room = chats.find(chat => chat.user.id === advert.owner.id);

        if (room) {
            return goToChat();
        } else {
            try {
                const response = await createRoom(
                    advert.owner.id,
                    'Olá :) Tenho interesse no seu livro!',
                );
                dispatch(onNewChat(response.data));

                goToChat();
            } catch (error) {
                console.log('deu nao');
            }
        }
    }

    function goToChat() {
        navigation.navigate('Chats', {
            screen: 'RoomList',
            params: {
                user: advert.owner,
            },
        });
    }

    async function handleDelete() {
        setShowSuccessModal(true);
        await deleteAdvert(advertId);
    }

    function handleModalHide() {
        setShowSuccessModal(false);
        navigation.navigate('MyAds');
    }

    function handleLike() {
        dispatch(handleLikeAction(advert.id));
    }

    return (
        <>
            <View style={Styles.Page}>
                <View style={Styles.CoverContainer}>
                    <Background
                        width={'90%'}
                        height={'90%'}
                        style={Styles.BackgroundSvg}
                    />
                    {loggedUser.id === advert.owner.id ? (
                        <RectButton
                            onPress={handleDelete}
                            style={Styles.IconButton}>
                            <Icon size={28} name="trash" color="#666666" />
                        </RectButton>
                    ) : (
                        <LikeButton
                            liked={advert.viewer_liked}
                            style={Styles.IconButton}
                            onPress={handleLike}
                        />
                    )}
                    <Swiper
                        containerStyle={Styles.ImgCoverContainer}
                        activeDotColor="#FB8C00">
                        {advert.covers_url.map(cover => (
                            <FastImage
                                source={{ uri: cover.url }}
                                key={cover.url + cover.id}
                                style={Styles.ImgCover}
                            />
                        ))}
                    </Swiper>
                </View>
                <View style={Styles.InfoContainer}>
                    <Text style={Styles.Title}>{advert.title}</Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={Styles.Author}>{advert.author}</Text>
                        <Text style={Styles.Price}>R$ {advert.price}</Text>
                    </View>
                    <View style={Styles.Row}>
                        {advert.categories.map((cat, index) => (
                            <Chip
                                key={cat.id}
                                textStyle={{ fontSize: 12, height: 10 }}>
                                {cat.name}
                            </Chip>
                        ))}
                    </View>
                </View>
                <Tabs
                    initialPage={0}
                    tabBarUnderlineStyle={{
                        backgroundColor: '#FB8C00',
                        borderRadius: 10,
                    }}>
                    <Tab
                        heading={t('advertDetails.tabs.description')}
                        textStyle={Styles.TabHeadingText}
                        tabStyle={Styles.TabHeading}
                        activeTabStyle={Styles.SectionTextActive}
                        activeTextStyle={Styles.SectionTextActive}>
                        <View style={Styles.SectionContent}>
                            <Text>{advert.description}</Text>
                        </View>
                    </Tab>
                    <Tab
                        heading={t('advertDetails.tabs.localization')}
                        textStyle={Styles.TabHeadingText}
                        tabStyle={Styles.TabHeading}
                        activeTabStyle={Styles.SectionTextActive}
                        activeTextStyle={Styles.SectionTextActive}>
                        <View style={Styles.SectionContentRow}>
                            <View style={Styles.RowLeftSide} />
                            <View style={Styles.RowRightSide} />
                        </View>
                    </Tab>
                    <Tab
                        heading={t('advertDetails.tabs.contact')}
                        textStyle={Styles.TabHeadingText}
                        tabStyle={Styles.TabHeading}
                        activeTabStyle={Styles.SectionTextActive}
                        activeTextStyle={Styles.SectionTextActive}>
                        <View style={Styles.SectionContentRow}>
                            <View style={Styles.RowLeftSide}>
                                <View style={Styles.ElipseAvatar}>
                                    {advert.owner.avatar_url ? (
                                        <FastImage
                                            source={{
                                                uri: advert.owner.avatar_url,
                                            }}
                                            style={{
                                                width: '90%',
                                                height: '90%',
                                                borderRadius: 120,
                                            }}
                                        />
                                    ) : (
                                        <DefaultProfile
                                            height="90%"
                                            width="90%"
                                        />
                                    )}
                                </View>
                            </View>
                            <View style={Styles.RowRightSide}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: '#ff7719',
                                        fontWeight: 'bold',
                                    }}>{`${advert.owner.first_name} ${
                                    advert.owner.last_name
                                }`}</Text>
                                {/* <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        width: 40,
                                        elevation: 3,
                                    }}>
                                    <Icon
                                        name="star"
                                        color="#ffff00"
                                        size={16}
                                    />
                                    <Text style={{}}>4.8</Text>
                                </View> */}
                                {/* <TouchableOpacity
                                    style={{}}
                                    onPress={() => console.log('Ver Perfil')}>
                                    <Text style={{}}>
                                        {t('advertDetails.profile.button')}
                                    </Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    style={[
                                        Styles.MessageButton,
                                        loggedUser.id === advert.owner.id && {
                                            backgroundColor: '#E5E5E5',
                                        },
                                    ]}
                                    onPress={contactSeller}
                                    disabled={
                                        loggedUser.id === advert.owner.id
                                    }>
                                    <Text style={Styles.ButtonText}>
                                        {t('advertDetails.profile.talk')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Tab>
                </Tabs>
            </View>
            <SuccessFeedback
                isVisible={showSuccessModal}
                handleModalHide={handleModalHide}>
                <Text style={Styles.TextH1}>Sucesso!</Text>
                <Text style={Styles.TextP}>
                    O anúncio foi removido com sucesso!
                </Text>
                <TouchableOpacity
                    style={Styles.ModalButton}
                    onPress={handleModalHide}>
                    <Text style={Styles.ButtonTextModal}>Voltar</Text>
                </TouchableOpacity>
            </SuccessFeedback>
        </>
    );
};

export default AdvertDetails;
