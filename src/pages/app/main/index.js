import React, { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './style';
import CategoryList from './category-list';
import AdvertList from './advert-list';
import Loading from '../components/loading';
import Plus from '../../../assets/icons/add-book.svg';
import {
    subscribeToChannel,
    unsubscribeChannel,
} from '../../../services/Pusher';
import FirstModal from './onboard-modals/first-modal';
import SecondModal from './onboard-modals/second-modal';
import { registerAppWithFCM } from '../../../services/RemotePushController';
import {
    loadAdvertsAction,
    loadNextPageAction,
    addAdvertAction,
} from '../../../redux/actions/advert';
import { loadCategoriesAction } from '../../../redux/actions/category';
import { addNotificationAction } from '../../../redux/actions/notification';

export default function Main(props) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.adverts.loading);
    const categories = useSelector(state => state.categories.data);
    const loadingMore = useSelector(state => state.adverts.loadingMore);
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const adverts = useSelector(state => state.adverts.data);
    const [likes, setLikes] = useState([]);
    const user = useSelector(state => state.auth);
    const hasMore = useSelector(state => state.adverts.nextPage);

    useEffect(() => {
        dispatch(loadAdvertsAction());
        dispatch(loadCategoriesAction());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            const globalChannel = subscribeToChannel('all-clients');
            globalChannel.bind('book-accepted', event => {
                dispatch(addAdvertAction(event.message));
            });

            const privateChannel = subscribeToChannel(`userID${user.id}`);
            privateChannel.bind('new-notification', event => {
                dispatch(addNotificationAction(event.message));
            });
        }
        return function cleanup() {
            unsubscribeChannel(`userID${user.id}`);
            unsubscribeChannel('all-clients');
        };
    }, [dispatch]);

    useEffect(() => {
        registerAppWithFCM();
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
        dispatch(loadAdvertsAction());
    }

    function handleEndReached() {
        if (hasMore) {
            dispatch(loadNextPageAction());
        }
    }

    return (
        <SafeAreaView style={Styles.Container}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <CategoryList categories={categories} />
                    <AdvertList
                        adverts={adverts}
                        navigation={props.navigation}
                        user={user}
                        likes={likes}
                        refreshAdverts={refreshAdverts}
                        onEndReached={handleEndReached}
                        loadingMore={loadingMore}
                    />
                    <TouchableOpacity
                        style={Styles.AddButton}
                        onPress={handleOpenModal}>
                        <Plus />
                    </TouchableOpacity>
                    <FirstModal
                        isVisible={showFirstModal}
                        handleHideModal={handleHideModal}
                        nextModal={nextModal}
                    />
                    <SecondModal
                        isVisible={showSecondModal}
                        handleHideModal={handleHideModal}
                        navigateToForm={navigateToForm}
                    />
                </>
            )}
        </SafeAreaView>
    );
}
