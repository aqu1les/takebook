import {
	LOAD_ADVERTS,
	LOAD_ADVERTS_SUCCESS,
	LOAD_NEXT_PAGE_ADVERTS,
	LOAD_NEXT_PAGE_ADVERTS_SUCCESS,
	ADD_ADVERT,
	LOAD_ADVERT,
	LOAD_ADVERT_SUCCESS,
	LOAD_ADVERT_ERROR,
} from '../actions/advert';
import { HANDLE_LIKE } from '../actions/fav';
import _ from 'lodash';

const INITIAL_STATE = {
	loading: false,
	loadingMore: false,
	data: [],
	nextPage: null,
};

export default function advertsReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOAD_ADVERT: {
			const updatedAdverts = state.data.map((book) => {
				if (book.id === action.advertId) {
					book.loading = true;
				}

				return book;
			});

			return {
				...state,
				data: _.uniqBy(updatedAdverts, 'id'),
			};
		}
		case LOAD_ADVERT_SUCCESS: {
			const updatedAdverts = state.data.map((book) => {
				if (book.id === action.advert.id) {
					action.advert.loading = false;

					return {
						...book,
						...action.advert,
					};
				}
				return book;
			});

			return {
				...state,
				data: _.uniqBy(updatedAdverts, 'id'),
			};
		}
		case LOAD_ADVERT_ERROR: {
			const updatedAdverts = state.data.map((book) => {
				if (book.id === action.advertId) {
					book.loading = false;
					book.error = true;
				}

				return book;
			});

			return {
				...state,
				data: _.uniqBy(updatedAdverts, 'id'),
			};
		}
		case LOAD_ADVERTS: {
			return {
				...state,
				loading: true,
			};
		}
		case LOAD_ADVERTS_SUCCESS: {
			return {
				...state,
				loading: false,
				data: _.uniqBy(action.adverts.data, 'id'),
				nextPage: action.adverts.nextPage,
			};
		}
		case LOAD_NEXT_PAGE_ADVERTS: {
			return {
				...state,
				loadingMore: true,
			};
		}
		case LOAD_NEXT_PAGE_ADVERTS_SUCCESS: {
			return {
				...state,
				loadingMore: false,
				data: [...state.data, ...action.adverts.data],
				nextPage: action.adverts.nextPage,
			};
		}
		case ADD_ADVERT: {
			return {
				...state,
				data: _.uniqBy([action.advert, ...state.data], 'id'),
			};
		}
		case HANDLE_LIKE: {
			const newData = state.data.map((advert) => {
				if (advert.id === action.advertId) {
					advert.viewer_liked = action.viewerLiked;
				}

				return advert;
			});

			return {
				...state,
				data: _.uniqBy([...newData], 'id'),
			};
		}
		default:
			return state;
	}
}
