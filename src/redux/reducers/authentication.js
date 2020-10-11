import {
	LOAD_INFO,
	LOAD_INFO_ERROR,
	LOAD_INFO_SUCCESS,
	CHECK_TOKEN,
	CHECK_TOKEN_SUCCESS,
	LOG_OUT,
} from '../actions/authentication';
import { removeToken, storeToken } from '../../services/UserService';
import PushNotification from 'react-native-push-notification';

const INITIAL_STATE = {
	authenticated: false,
	loading: true,
	checked: false,
	id: null,
	first_name: '',
	last_name: '',
	email: '',
	address_street: null,
	address_number: null,
	address_neighborhood: null,
	address_city: null,
	address_state: null,
	address_zip_code: null,
	created_at: null,
	updated_at: null,
	avatar_url: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOAD_INFO:
			return {
				...state,
				loading: true,
			};
		case LOAD_INFO_SUCCESS:
			storeToken(action.user.token);
			delete action.notifications;
			return {
				...state,
				...action.user,
				authenticated: true,
				loading: false,
			};
		case LOAD_INFO_ERROR: {
			return {
				...state,
				loading: false,
				checked: true,
			};
		}
		case CHECK_TOKEN:
			return {
				...state,
				loading: true,
			};
		case CHECK_TOKEN_SUCCESS:
			return {
				...state,
				loading: false,
				checked: true,
			};
		case LOG_OUT:
			removeToken();
			PushNotification.setApplicationIconBadgeNumber(0);
			// Remove FCM
			return { authenticated: false, loading: false };
		default:
			return state;
	}
}
