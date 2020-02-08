import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    Image,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Styles from './style';
import Advert from './advert';
import Plus from '../../../assets/icons/add-book.svg';
import BookModal from '../../../assets/book-modal.svg';
import CloseIcon from '../../../assets/close.svg';
import DefaultBook from '../../../assets/bookDefault.jpg';
import RemotePushController from '../../../services/RemotePushController';
import {
    subscribeToChannel,
    unsubscribeChannel,
} from '../../../services/Pusher';
import { getCategories } from '../../../services/CategoriesService';
import {
    getAdverts,
    refreshAdverts,
    storeAdvert,
} from '../../../services/AdvertsService';
import { getUser } from '../../../services/UserService';

export default Main = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [adverts, setAdverts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        setLoading(true);
        async function loadData() {
            const responseCat = await getCategories();
            const responseAd = await getAdverts();
            const responseUser = await getUser();
            setUser(responseUser);
            setCategories([{ name: 'Destaques' }, ...responseCat]);
            setAdverts(responseAd);
            setLoading(false);
        }
        loadData();
    }, []);

    useEffect(() => {
        if (user) {
            const globalChannel = subscribeToChannel('all-clients');
            globalChannel.bind('book-accepted', event => {
                console.log('BOOK ACCEPTED', event);
                storeAdvert(event.message);
                setAdverts(adverts => [event.message, ...adverts]);
            });

            const privateChannel = subscribeToChannel(`userID${user.id}`);
            privateChannel.bind('new-notification', event => {
                console.log(event);
            });
        }
        return function cleanup() {
            unsubscribeChannel(`userID${user.id}`);
            unsubscribeChannel('all-clients');
        };
    }, []);

    function CategoryItem({ name }) {
        let icon;
        switch (name) {
            case 'Destaques':
                icon = 'star-outline';
                break;
            case 'Terror':
                icon = 'drama-masks';
                break;
            case 'Comédia':
                icon = 'emoticon-happy-outline';
                break;
            case 'Mistério':
                icon = 'magnify';
                break;
            case 'Aventura':
                icon = 'run';
                break;
        }
        return (
            <TouchableOpacity style={Styles.Category}>
                <Icon name={icon} size={26} color="#000000" />
                <Text>{name}</Text>
            </TouchableOpacity>
        );
    }

    function renderSeparator() {
        return (
            <View
                style={{
                    height: '60%',
                    backgroundColor: '#d1d1d1',
                    width: 1,
                    marginVertical: '15%',
                    marginHorizontal: 5,
                }}
            />
        );
    }

    async function refreshAds() {
        setRefreshing(true);
        setAdverts(await refreshAdverts());
        setRefreshing(false);
    }

    function handleHideModal() {
        setShowFirstModal(false);
        setShowSecondModal(false);
    }

    function handleOpenModal() {
        setShowFirstModal(true);
    }

    function nextModal() {
        setShowFirstModal(false);
        setShowSecondModal(true);
    }

    function navigateToForm() {
        props.navigation.navigate('NewBook');
        handleHideModal();
    }

    return (
        <SafeAreaView style={Styles.Container}>
            {loading ? (
                <SafeAreaView style={Styles.LoadingContainer}>
                    <ActivityIndicator></ActivityIndicator>
                </SafeAreaView>
            ) : (
                    <>
                        <View style={Styles.Categories}>
                            <FlatList
                                data={categories}
                                renderItem={({ item }) => (
                                    <CategoryItem name={item.name} />
                                )}
                                keyExtractor={item => item.name}
                                horizontal={true}
                                contentContainerStyle={{
                                    justifyContent: 'space-around',
                                    width: '100%',
                                }}
                                ItemSeparatorComponent={renderSeparator}
                            />
                        </View>
                        <View style={Styles.Content}>
                            <Text style={Styles.H1}>Mais Recentes</Text>
                            {adverts.length > 0 ? (
                                <FlatList
                                    data={adverts}
                                    renderItem={({ item }) => (
                                        <Advert
                                            item={item}
                                            navigation={props.navigation}
                                            owner={item.user}
                                            user={user}
                                        />
                                    )}
                                    keyExtractor={item => String(item.id)}
                                    refreshControl={
                                        <RefreshControl
                                            colors={['#fb8c00', '#38C2FF']}
                                            refreshing={refreshing}
                                            onRefresh={refreshAds}
                                        />
                                    }
                                    showsVerticalScrollIndicator={false}
                                />
                            ) : (
                                    <Text>Nenhum livro foi cadastrado!</Text>
                                )}
                        </View>
                        <TouchableOpacity
                            style={Styles.AddButton}
                            onPress={navigateToForm}>
                            <Plus />
                        </TouchableOpacity>
                        <Modal
                            style={Styles.Modal}
                            isVisible={showFirstModal}
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
                        <Modal
                            style={Styles.Modal}
                            isVisible={showSecondModal}
                            animationIn="slideInRight"
                            animationOut="zoomOut"
                            onModalHide={handleHideModal}>
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
                                <Image
                                    source={DefaultBook}
                                    style={{
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
                                        style={{ marginLeft: 5 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </>
                )}
            <RemotePushController />
        </SafeAreaView>
    );
};
