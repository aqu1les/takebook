import React, { useState, useEffect, memo } from 'react';
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
import { addNotificationAction } from '../../../redux/actions/notification';
import { loadCategoriesAction } from '../../../redux/actions/category';

function Main(props) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.adverts.loading);
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const user = useSelector(state => state.auth);
    const hasMore = useSelector(state => state.adverts.nextPage);

    useEffect(() => {
        if (user) {
            const globalChannel = subscribeToChannel('all-clients');
            globalChannel.bind('book-accepted', event => {
                console.log('new book');
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
        dispatch(loadAdvertsAction());
        dispatch(loadCategoriesAction());
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
            {!loading ? (
                <>
                    <CategoryList />
                    <AdvertList
                        navigation={props.navigation}
                        refreshAdverts={refreshAdverts}
                        onEndReached={handleEndReached}
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
            ) : (
                <Loading />
            )}
        </SafeAreaView>
    );
}

export default memo(Main);
