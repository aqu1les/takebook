import React, { useState, useEffect, memo } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
    const navigation = useNavigation();
    const loading = useSelector(state => state.adverts.loading);
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const user = useSelector(state => state.auth);
    const hasMore = useSelector(state => state.adverts.nextPage);
    const categories = useSelector(state => state.categories.data);

    useEffect(() => {
        if (!showFirstModal && !showSecondModal && categories.length === 0) {
            dispatch(loadCategoriesAction());
            dispatch(loadAdvertsAction());

            if (user) {
                const globalWS = 'all-clients';
                const userWS = `userID${user.id}`;
                const globalChannel = subscribeToChannel(globalWS);
                const privateChannel = subscribeToChannel(userWS);

                globalChannel.bind('book-accepted', event => {
                    dispatch(addAdvertAction(event.message));
                });

                privateChannel.bind('new-notification', event => {
                    dispatch(addNotificationAction(event.message));
                });

                registerAppWithFCM();

                return function cleanup() {
                    unsubscribeChannel(globalWS);
                    unsubscribeChannel(userWS);
                };
            }
        }
    }, [dispatch, user, showFirstModal, showSecondModal]);

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
        handleHideModal();
        navigation.navigate('NewBook');
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
