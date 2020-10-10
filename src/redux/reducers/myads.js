import {
	LOAD_MY_ADVERTS,
	LOAD_MY_ADVERTS_SUCCESS,
	LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS,
	LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS_SUCCESS,
} from '../actions/myads';

const INITIAL_STATE = {
	loading: false,
	loadingMore: false,
	data: [],
	nextPage: null,
};

export default function myAdvertsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOAD_MY_ADVERTS: {
			return {
				...state,
				loading: true,
			};
		}
		case LOAD_MY_ADVERTS_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.adverts.data,
				nextPage: action.adverts.nextPage,
			};
		}
		case LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS: {
			return {
				...state,
				loadingMore: true,
			};
		}
		case LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS_SUCCESS: {
			return {
				...state,
				loadingMore: false,
				data: [...state.data, ...action.adverts.data],
				nextPage: action.adverts.nextPage,
			};
		}
		default:
			return state;
	}
}
