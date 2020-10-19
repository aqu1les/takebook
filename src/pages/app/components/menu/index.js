import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	View,
	StatusBar,
	Image,
	TouchableOpacity,
	Text,
	FlatList,
	SafeAreaView,
} from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './style';
import MenuBG from '../../../../assets/background/menubg.svg';
import DefaultProfile from '../../../../assets/icons/defaultProfile.svg';
import Book from '../../../../assets/open-book.png';
import { logOutAction } from '../../../../redux/actions/authentication';
import { useTranslation } from 'react-i18next';

function SideBar(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const isDrawerOpen = useIsDrawerOpen();
	const user = useSelector((state) => state.auth);

	const menuItens = [
		{
			title: t('routes.home'),
			icon: 'home-outline',
			active: props.state.index === 0 ? true : false,
			route: 'Main',
		},
		{
			title: t('routes.profile'),
			icon: 'clipboard-account-outline',
			active: props.state.index === 1 ? true : false,
			route: 'Profile',
		},
		{
			title: t('routes.myAds'),
			icon: 'book-open-page-variant',
			active: props.state.index === 2 ? true : false,
			route: 'MyAds',
		},
		{
			title: t('routes.chats'),
			icon: 'forum-outline',
			active: props.state.index === 3 ? true : false,
			route: 'Chats',
		},
		{
			title: t('routes.bookmarks'),
			icon: 'heart-outline',
			active: props.state.index === 4 ? true : false,
			route: 'Bookmarks',
		},
	];

	function Item({ title, icon, active, route }) {
		return (
			<TouchableOpacity
				style={[Styles.ListItem, active ? Styles.ListItemActive : {}]}
				onPress={(e) => navigateByRoute(route)}>
				<Icon
					name={icon}
					size={26}
					color={active ? '#f06922' : '#000000'}
				/>
				<Text
					style={[
						Styles.ItemText,
						active ? { fontWeight: 'bold' } : {},
					]}>
					{title}
				</Text>
			</TouchableOpacity>
		);
	}
	function navigateByRoute(route) {
		props.navigation.navigate(route, { initial: true });
	}
	async function logOut() {
		dispatch(logOutAction());
	}
	return (
		<SafeAreaView style={Styles.Menu}>
			<StatusBar
				backgroundColor={isDrawerOpen && user ? '#c98d2d' : '#0092CC'}
				barStyle="light-content"
			/>
			{user.authenticated ? (
				<>
					<View style={Styles.UserInfo}>
						<MenuBG style={Styles.Background} />
						<View style={Styles.UserAvatar}>
							{user.avatar_url ? (
								<Image
									source={{ uri: user.avatar_url }}
									style={Styles.UserPic}
								/>
							) : (
								<DefaultProfile height="100%" width="100%" />
							)}
						</View>
						<View style={Styles.LeftSide}>
							<Text
								style={
									Styles.Name
								}>{`${user.first_name} ${user.last_name}`}</Text>
							{/* <View style={Styles.RateSession}>
                                <Icon name="star" size={20} color="#fedf43" />
                                <Text style={Styles.Rate}>4,8</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={Styles.ProfileLink}>
                                    Ver seu Perfil
                                </Text>
                            </TouchableOpacity> */}
						</View>
					</View>
					<View style={Styles.NavOptions}>
						<FlatList
							data={menuItens}
							renderItem={({ item }) => (
								<Item
									title={item.title}
									icon={item.icon}
									active={item.active}
									route={item.route}
								/>
							)}
							keyExtractor={(item) => item.title}
						/>
						<TouchableOpacity
							onPress={logOut}
							disabled={!user.authenticated}
							style={Styles.ListItem}>
							<Icon name="logout" size={26} color="#000" />
							<Text style={Styles.ItemText}>
								{t('routes.logout')}
							</Text>
						</TouchableOpacity>
					</View>
				</>
			) : (
				<View style={Styles.GuestContentContainer}>
					<TouchableOpacity onPress={() => navigateByRoute('Auth')}>
						<Image source={Book} />
						<Text>Clique aqui para fazer login</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	);
}

export default memo(SideBar);
