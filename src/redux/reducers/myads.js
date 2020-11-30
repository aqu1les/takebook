import _ from 'lodash';

import {
	LOAD_ADVERT,
	LOAD_ADVERT_SUCCESS,
	LOAD_ADVERT_ERROR,
} from './../actions/advert';

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
		default:
			return state;
	}
}
