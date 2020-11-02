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
	loading: false,
	checked: false,
	id: null,
	first_name: '',
	last_name: '',
	email: '',
	address: {
		number: null,
		street: '',
		neighborhood: '',
		city: '',
		state: '',
		zip_code: '',
	},
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
			if (action.user.token) {
				storeToken(action.user.token);
			}

			if (!action.user.address) {
				action.user.address = {
					street: '',
					neighborhood: '',
					city: '',
					state: '',
					zip_code: '',
				};
			}

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
