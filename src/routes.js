import { Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Loading from './pages/loading';
import Login from './pages/auth/login';
import Home from './pages/app/main';
import SignUp from './pages/auth/sign-up';
import SideMenu from './pages/app/components/menu';

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            headerShown: false
        }),
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: ({ navigation }) => ({
            headerTransparent: true
        }),
    }
}, {
    initialRouteName: "Login",
    transitionConfig: () => ({
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
    })
});

const AppStack = createDrawerNavigator({
    Home
}, {
    initialRouteName: "Home",
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 100,
});
const Routes = createAppContainer(
    createSwitchNavigator({
        Loading,
        App: AppStack,
        Auth: AuthStack
    }, { initialRouteName: 'Loading' })
);

export default Routes;