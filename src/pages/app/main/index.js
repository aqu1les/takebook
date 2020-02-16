import React, { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import Styles from './style';
import CategoryList from './category-list';
import AdvertList from './advert-list';
import Loading from '../components/loading';
import Plus from '../../../assets/icons/add-book.svg';
import RemotePushController from '../../../services/RemotePushController';
import { subscribeToChannel, unsubscribeChannel } from '../../../services/Pusher';
import FirstModal from './onboard-modals/first-modal';
import SecondModal from './onboard-modals/second-modal';
import AdvertStore from '../../../stores/AdvertStore';
import UserStore from '../../../stores/UserStore';
import CategoryStore from '../../../stores/CategoryStore';

export default Main = (props) => {
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [adverts, setAdverts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [user, setUser] = useState({});
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        const unsubscribeCategory = CategoryStore.subscribe(state => {
            setCategories([{ name: 'Destaques' }, ...state.categories]);
        });
        const unsubscribeAdverts = AdvertStore.subscribe(state => {
            setLoading(state.loading);
            setLoadingMore(state.loadingMore);
            setAdverts(state.adverts);
            setHasMore(state.nextPageUrl ? true : false);
        });

        const unsubscribeUser = UserStore.subscribe(state => {
            setUser(state);
            setLikes(state.likes);
        });

        CategoryStore.loadCategories();
        UserStore.loadUserInfo();
        AdvertStore.loadAdverts();

        return () => {
            unsubscribeAdverts();
            unsubscribeUser();
            unsubscribeCategory();
        };

    }, []);

    useEffect(() => {
        if (user) {
            const globalChannel = subscribeToChannel('all-clients');
            globalChannel.bind('book-accepted', event => {
                AdvertStore.advertAccepted(event.message);
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

    function refreshAdverts() {
        AdvertStore.loadAdverts();
        UserStore.loadLikes();
    }

    function handleEndReached() {
        if (hasMore) {
            console.log('tem mais e vai carregar mais');
            AdvertStore.loadNextPage();
        }
    }

    return (
        <SafeAreaView style={Styles.Container}>
            {loading ? <Loading /> :
                <>
                    <CategoryList categories={categories} />
                    <AdvertList
                        adverts={adverts}
                        navigation={props.navigation}
                        user={user} likes={likes}
                        refreshAdverts={refreshAdverts}
                        onEndReached={handleEndReached}
                        loadingMore={loadingMore}
                    />
                    <TouchableOpacity
                        style={Styles.AddButton}
                        onPress={handleOpenModal}>
                        <Plus />
                    </TouchableOpacity>
                    <FirstModal isVisible={showFirstModal} handleHideModal={handleHideModal} nextModal={nextModal} />
                    <SecondModal isVisible={showSecondModal} handleHideModal={handleHideModal} navigateToForm={navigateToForm} />
                </>
            }
            <RemotePushController />
        </SafeAreaView>
    );
};
