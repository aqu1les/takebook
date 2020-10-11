import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StatusBar, ActivityIndicator } from 'react-native';
import Styles from './style';
import Logo from '../../assets/logo.svg';
import BgBr from '../../assets/background/backgroundBottomRight.svg';
import BgTL from '../../assets/background/backgroundTopLeft.svg';
import { Transition, Transitioning } from 'react-native-reanimated';
import {
	setUserAction,
	tokenValidated,
} from '../../redux/actions/authentication';
import { setNotificationsAction } from '../../redux/actions/notification';
import { loadFavoritesAction } from '../../redux/actions/fav';
import { loadAuthErrorAction } from './../../redux/actions/authentication';
import { getToken, getUser } from '../../services/UserService';

export default function Loading() {
	const dispatch = useDispatch();
	const transition = <Transition.Change interpolation="easeInOut" />;
	const loading = useSelector((state) => state.auth.loading);
	const authenticated = useSelector((state) => state.auth.authenticated);

	useEffect(() => {
		async function checkUser() {
			try {
				const response = await getUser();
				const token = await getToken();
				if (response) {
					if (response.status === 200) {
						dispatch(
							setNotificationsAction(response.data.notifications),
						);
						await dispatch(
							setUserAction({
								...response.data,
								token,
							}),
						);
						dispatch(tokenValidated());
						dispatch(loadFavoritesAction());
					} else {
						dispatch(loadAuthErrorAction());
					}
				} else {
					dispatch(loadAuthErrorAction());
				}
			} catch (e) {
				dispatch(loadAuthErrorAction());
			}
		}
		if (loading && !authenticated) {
			checkUser();
		}
	}, [loading, authenticated, dispatch]);

	return (
		<>
			<StatusBar
				backgroundColor={'#FFFFFF'}
				barStyle={'dark-content'}
				hidden={true}
			/>
			<Transitioning.View
				transition={transition}
				style={Styles.Container}>
				<View style={Styles.ImageLeft}>
					<BgTL width={'100%'} height={'100%'} />
				</View>
				<View style={Styles.ImageRight}>
					<BgBr width={'100%'} height={'100%'} />
				</View>
				<View>
					<Logo />
				</View>
				<ActivityIndicator
					color={'#fb8c00'}
					style={Styles.ActvIndicator}
				/>
			</Transitioning.View>
		</>
	);
}
