import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Loading from './pages/loading';
import Login from './pages/auth/login';
import Home from './pages/app/main';
import AdvertDetails from './pages/app/main/advert-details';
import NewBook from './pages/app/main/new-book';
import SignUp from './pages/auth/sign-up';
import SideMenu from './pages/app/components/menu';
import RoomList from './pages/app/chats/';
import Room from './pages/app/chats/Room';
import Header from './pages/app/components/header';
import AdList from './pages/app/bookmarks/index';
import MyAdsList from './pages/app/myads/index';
import { checkTokenAction } from './redux/actions/authentication';
import ForgotPassword_1 from './pages/auth/forgot-password/step-1/index';
import ForgotPassword_2 from './pages/auth/forgot-password/step-2/index';
import ForgotPassword_3 from './pages/auth/forgot-password/step-3/index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ForgotPasswordStack() {
	const ScreenOptions = {
		headerTransparent: true,
		headerTintColor: '#000',
		title: '',
	};

	return (
		<Stack.Navigator
			animationEnabled={true}
			screenOptions={{ gestureDirection: 'horizontal' }}
			initialRouteName="ForgotPassword_1"
			headerMode="screen">
			<Stack.Screen
				name="ForgotPassword_1"
				component={ForgotPassword_1}
				options={{ ...ScreenOptions, headerShown: true }}
			/>
			<Stack.Screen
				name="ForgotPassword_2"
				component={ForgotPassword_2}
				options={ScreenOptions}
			/>
			<Stack.Screen
				name="ForgotPassword_3"
				component={ForgotPassword_3}
				options={ScreenOptions}
			/>
		</Stack.Navigator>
	);
}

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
				component={ForgotPasswordStack}
				options={{
					headerTransparent: true,
					headerTintColor: '#000',
					title: '',
					headerShown: false,
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
					headerTitle: 'Cadastrar Livro',
				}}
			/>
		</Stack.Navigator>
	);
}

function Chats() {
	return (
		<Stack.Navigator initialRouteName="RoomList">
			<Stack.Screen
				name="RoomList"
				component={RoomList}
				options={{
					header: (props) => <Header {...props} title="Conversas" />,
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
	return (
		<Stack.Navigator initialRouteName="AdList">
			<Stack.Screen
				name="AdList"
				component={AdList}
				options={{
					header: (props) => <Header {...props} title="Favoritos" />,
				}}
			/>
		</Stack.Navigator>
	);
}

function MyAds() {
	return (
		<Stack.Navigator initialRouteName="MyAdverts">
			<Stack.Screen
				name="MyAdverts"
				component={MyAdsList}
				options={{
					header: (props) => (
						<Header {...props} title="Meus Anúncios" />
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
