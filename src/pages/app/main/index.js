import React, { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import Styles from './style';
import CategoryList from './category-list';
import AdvertList from './advert-list';
import Loading from '../components/loading';
import Plus from '../../../assets/icons/add-book.svg';
import RemotePushController from '../../../services/RemotePushController';
import { subscribeToChannel, unsubscribeChannel } from '../../../services/Pusher';
import { getCategories } from '../../../services/CategoriesService';
import { getAdverts, storeAdvert } from '../../../services/AdvertsService';
import { getUser } from '../../../services/UserService';
import { getUserLikes } from '../../../services/LikeService';
import FirstModal from './onboard-modals/first-modal';
import SecondModal from './onboard-modals/second-modal';

export default Main = (props) => {
    const [loading, setLoading] = useState(true);
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [adverts, setAdverts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [user, setUser] = useState({});
    const [refreshLikes, setRefreshLikes] = useState(false);
    const [refreshAdverts, setRefreshAdverts] = useState(false);

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
    }, [refreshAdverts]);

    useEffect(() => {
        async function loadLikes() {
            const responseLikes = await getUserLikes();
            setLikes(responseLikes);
        }
        loadLikes();
    }, [refreshLikes]);

    useEffect(() => {
        if (user) {
            const globalChannel = subscribeToChannel('all-clients');
            globalChannel.bind('book-accepted', event => {
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
            {loading ? <Loading /> :
                <>
                    <CategoryList categories={categories} />
                    <AdvertList adverts={adverts} navigation={props.navigation} user={user} likes={likes} setRefreshLikes={setRefreshLikes} refreshAdverts={setRefreshAdverts} />
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
