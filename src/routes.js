import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Loading from './pages/loading';
import Login from './pages/auth/login';
import Home from './pages/app/main';
import MyProfile from './pages/app/my-profile/index';
import AdvertDetails from './pages/app/main/advert-details';
import NewBook from './pages/app/main/new-book';
import SignUp from './pages/auth/sign-up';
import SideMenu from './pages/app/components/menu';
import RoomList from './pages/app/chats/';
import Room from './pages/app/chats/Room';
import Header from './pages/app/components/header';
import AdList from './pages/app/bookmarks/index';
import MyAdsList from './pages/app/myads/index';
import ForgotPassword from './pages/auth/forgot-password/index';
import { checkTokenAction } from './redux/actions/authentication';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
	return (
		<Stack.Navigator initialRouteName="Login" headerMode="screen">
			<Stack.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }}
				initialParams={{ redirectEmail: '' }}
			/>
			<Stack.Screen
				name="ForgotPassword"
				component={ForgotPassword}
				options={{
					headerTransparent: true,
					headerTintColor: '#000',
					title: '',
				}}
			/>
			<Stack.Screen
				name="SignUp"
				component={SignUp}
				options={{
					headerTransparent: true,
					headerTintColor: '#000',
					title: '',
				}}
			/>
		</Stack.Navigator>
	);
}

function Main() {
	const { t } = useTranslation();

	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={Home}
				options={{ header: (props) => <Header {...props} /> }}
			/>
			<Stack.Screen
				name="AdvertDetails"
				component={AdvertDetails}
				options={{
					headerTransparent: true,
					title: '',
					unmountOnBlur: true,
				}}
			/>
			<Stack.Screen
				name="NewBook"
				component={NewBook}
				options={{
					headerTransparent: false,
					headerStyle: {
						backgroundColor: '#3ac2fe',
					},
					headerTintColor: '#FFF',
					headerTitle: t('global.createBook'),
				}}
			/>
		</Stack.Navigator>
	);
}

function ProfileStack() {
	const { t } = useTranslation();

	return (
		<Stack.Navigator initialRouteName="MyProfile">
			<Stack.Screen
				name="MyProfile"
				component={MyProfile}
				options={{
					header: (props) => (
						<Header {...props} title={t('global.profile')} />
					),
				}}
			/>
		</Stack.Navigator>
	);
}

function Chats() {
	const { t } = useTranslation();

	return (
		<Stack.Navigator initialRouteName="RoomList">
			<Stack.Screen
				name="RoomList"
				component={RoomList}
				options={{
					header: (props) => (
						<Header {...props} title={t('global.chats')} />
					),
				}}
				initialParams={{ user: null }}
			/>
			<Stack.Screen
				name="Room"
				component={Room}
				options={({ route }) => ({
					headerTransparent: false,
					headerStyle: {
						backgroundColor: '#3ac2fe',
					},
					headerTintColor: '#FFF',
					title: route.params.title,
				})}
			/>
		</Stack.Navigator>
	);
}

function Bookmarks() {
	const { t } = useTranslation();

	return (
		<Stack.Navigator initialRouteName="AdList">
			<Stack.Screen
				name="AdList"
				component={AdList}
				options={{
					header: (props) => (
						<Header {...props} title={t('global.bookmarks')} />
					),
				}}
			/>
		</Stack.Navigator>
	);
}

function MyAds() {
	const { t } = useTranslation();

	return (
		<Stack.Navigator initialRouteName="MyAdverts">
			<Stack.Screen
				name="MyAdverts"
				component={MyAdsList}
				options={{
					header: (props) => (
						<Header {...props} title={t('global.myads')} />
					),
				}}
			/>
		</Stack.Navigator>
	);
}

function App() {
	return (
		<Drawer.Navigator
			initialRouteName="Main"
			drawerContent={(props) => <SideMenu {...props} />}
			drawerStyle={{ width: Dimensions.get('window').width - 100 }}
			openByDefault={false}>
			<Drawer.Screen name="Main" component={Main} />
			<Drawer.Screen name="Profile" component={ProfileStack} />
			<Drawer.Screen name="MyAds" component={MyAds} />
			<Drawer.Screen name="Chats" component={Chats} />
			<Drawer.Screen name="Bookmarks" component={Bookmarks} />
		</Drawer.Navigator>
	);
}

function TakebookRoutes() {
	const dispatch = useDispatch();
	const loading = useSelector((state) => state.auth.loading);
	const checked = useSelector((state) => state.auth.checked);
	const authenticated = useSelector((state) => state.auth.authenticated);

	useEffect(() => {
		dispatch(checkTokenAction());
	}, [dispatch]);

	const AppStack = useMemo(() => {
		return authenticated ? <App /> : <AuthStack />;
	}, [authenticated]);

	if (loading && !checked) {
		return <Loading />;
	}

	return <NavigationContainer>{AppStack}</NavigationContainer>;
}

export default TakebookRoutes;
