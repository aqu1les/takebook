import React, { useState, useEffect, memo, useCallback } from 'react';
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
import {
	loadChatsAction,
	addNewMessage,
	onNewChat,
} from './../../../redux/actions/chat';
import { addNotificationAction } from '../../../redux/actions/notification';
import { loadCategoriesAction } from '../../../redux/actions/category';
import SaleConfirmationModal from './sale-confirmation-modal/index';
import { getUser } from './../../../services/UserService';
import { setUserAction } from '../../../redux/actions/authentication';

function Main(props) {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const loading = useSelector((state) => state.adverts.loading);
	const [showFirstModal, setShowFirstModal] = useState(false);
	const [showSecondModal, setShowSecondModal] = useState(false);
	const user = useSelector((state) => state.auth);
	const hasMore = useSelector((state) => state.adverts.nextPage);
	const [isConfirmingSale, setIsConfirmingSale] = useState(false);

	const loadUserInfo = useCallback(async () => {
		try {
			const response = await getUser();
			dispatch(
				setUserAction({
					...response.data,
				}),
			);
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	useEffect(() => {
		if (!user.sales_to_confirmed || user.sales_to_confirmed.length === 0) {
			setIsConfirmingSale(false);
			return;
		} else {
			setIsConfirmingSale(true);
		}
	}, [user.sales_to_confirmed]);

	/* LOAD USER INFOS */
	useEffect(() => {
		dispatch(loadCategoriesAction());
		dispatch(loadAdvertsAction());
		dispatch(loadChatsAction());
	}, [dispatch]);

	/* SUBSCRIBE TO WS  */
	useEffect(() => {
		if (!user.id) {
			return false;
		}

		const globalWS = 'all-clients';
		const userWS = `userID${user.id}`;
		const globalChannel = subscribeToChannel(globalWS);
		const privateChannel = subscribeToChannel(userWS);

		globalChannel.bind('book-accepted', (event) => {
			dispatch(addAdvertAction(event.message));
		});

		privateChannel.bind('new-notification', (event) => {
			dispatch(addNotificationAction(event.message));
		});

		privateChannel.bind('new-message', (event) => {
			dispatch(addNewMessage(event.message.room_id, event.message));
		});

		privateChannel.bind('new-room', (event) => {
			const room = event.room;
			room.room_id = room.room_id || room.id;
			room.id = room.room_id;
			dispatch(onNewChat(room));
		});

		registerAppWithFCM();

		return () => {
			unsubscribeChannel(globalWS);
			unsubscribeChannel(userWS);
		};
	}, [dispatch, user.id]);

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
		dispatch(loadCategoriesAction());
		dispatch(loadAdvertsAction());
		dispatch(loadChatsAction());
		loadUserInfo();
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
					<SaleConfirmationModal
						isVisible={isConfirmingSale}
						onCloseModal={() => {
							setIsConfirmingSale(false);
							loadUserInfo();
						}}
						books={user.sales_to_confirmed}
					/>
				</>
			) : (
				<Loading />
			)}
		</SafeAreaView>
	);
}

export default memo(Main);
