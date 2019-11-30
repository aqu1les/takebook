import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
    authenticated: false
};

export default function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_USER":
            AsyncStorage.setItem("userToken:TB", action.user.token);
            return { ...state, ...action.user, authenticated: true };
        case "LOG_OUT":
            AsyncStorage.removeItem("userToken:TB");
            return { authenticated: false };
        default:
            return state;
    }
}