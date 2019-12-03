import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Loading from './pages/loading';
import Login from './pages/auth/login';
import Home from './pages/app/main';
import AdvertDetails from './pages/app/advert-details';
import SignUp from './pages/auth/sign-up';
import SideMenu from './pages/app/components/menu';


function transitionConfig() {
    return {
        transitionSpec: {},
        screenInterpolator: ({ layout, position, scene }) => {
            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            });

            const opacity = position.interpolate({
                inputRange: [
                    thisSceneIndex - 1,
                    thisSceneIndex - 0.99,
                    thisSceneIndex,
                    thisSceneIndex + 0.99,
                    thisSceneIndex + 1
                ],
                outputRange: [0, 1, 1, 0.3, 0]
            });

            return { opacity, transform: [{ translateX }] };
        }
    }
}
const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: () => ({
            headerShown: false
        }),
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: () => ({
            headerTransparent: true
        }),
    }
}, {
    initialRouteName: 'Login',
    transitionConfig
});
const Main = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: () => ({
            headerShown: false
        })
    },
    AdvertDetails: {
        screen: AdvertDetails,
        navigationOptions: () => ({
            headerTransparent: true
        })
    }
}, {
    initialRouteName: 'Home',
    transitionConfig
});
const App = createDrawerNavigator({
    Main
}, {
    initialRouteName: 'Main',
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 100,
});
const Routes = createAppContainer(
    createSwitchNavigator({
        Loading,
        App,
        Auth: AuthStack
    }, { initialRouteName: 'Loading' })
);

export default Routes;