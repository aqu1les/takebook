import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Loading from './pages/loading';
import Login from './pages/auth/login';
import Home from './pages/app/main';
import AdvertDetails from './pages/app/main/advert-details';
import NewBook from './pages/app/main/new-book';
import SignUp from './pages/auth/sign-up';
import SideMenu from './pages/app/components/menu';
import RoomList from './pages/app/chats/RoomList';
import Room from './pages/app/chats/RoomList/Room';
import Header from './pages/app/components/header';

function transitionConfig() {
    return {
        transitionSpec: {},
        screenInterpolator: ({ layout, position, scene }) => {
            const thisSceneIndex = scene.index;
            const width = layout.initWidth;

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            });

            const opacity = position.interpolate({
                inputRange: [
                    thisSceneIndex - 1,
                    thisSceneIndex,
                    thisSceneIndex + 1,
                ],
                outputRange: [0, 1, 1],
            });

            return { opacity, transform: [{ translateX }] };
        },
    };
}
const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: () => ({
                headerShown: false,
            }),
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: () => ({
                headerTransparent: true,
                headerTintColor: '#000',
                gestureDirection: 'inverted',
                headerForceInset: true,
            }),
        },
    },
    {
        initialRouteName: 'Login',
        transitionConfig,
    },
);
const Main = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: () => ({
                header: props => <Header {...props} />,
            }),
        },
        AdvertDetails: {
            screen: AdvertDetails,
            navigationOptions: () => ({
                headerTransparent: true,
            }),
        },
        NewBook: {
            screen: NewBook,
            navigationOptions: () => ({
                headerTransparent: false,
                headerStyle: {
                    backgroundColor: '#3ac2fe',
                },
                headerTintColor: '#FFF',
            }),
        },
    },
    {
        initialRouteName: 'Home',
        transitionConfig,
    },
);
const Chats = createStackNavigator(
    {
        RoomList: {
            screen: RoomList,
            navigationOptions: () => ({
                headerTransparent: true,
            }),
        },
        Room: {
            screen: Room,
            navigationOptions: ({ navigation }) => ({
                headerTransparent: false,
                headerStyle: {
                    backgroundColor: '#3ac2fe',
                },
                headerTintColor: '#FFF',
                title: navigation.getParam('title')
            }),
        },
    },
    {
        initialRouteName: 'RoomList',
        transitionConfig,
    },
);
const App = createDrawerNavigator(
    {
        Main,
        Chats,
    },
    {
        initialRouteName: 'Main',
        contentComponent: SideMenu,
        drawerWidth: Dimensions.get('window').width - 100,
    },
);
const Routes = createAppContainer(
    createSwitchNavigator(
        {
            Loading,
            App,
            Auth: AuthStack,
        },
        { initialRouteName: 'Loading' },
    ),
);

export default Routes;
