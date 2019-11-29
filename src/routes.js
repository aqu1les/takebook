import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/auth/login';

const Routes = createAppContainer(
    createSwitchNavigator({
        Auth: Login,
    }, { initialRouteName: 'Auth' })
);

export default Routes;