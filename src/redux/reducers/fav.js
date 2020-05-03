import {
    LOAD_FAVORITES,
    LOAD_FAVORITES_SUCCESS,
    LOAD_FAVORITES_NEXT_PAGE,
    LOAD_FAVORITES_NEXT_PAGE_SUCCESS,
    HANDLE_LIKE,
} from '../actions/fav';

const INITIAL_STATE = {
    loading: false,
    loadingMore: false,
    data: [],
    nextPage: null,
};

export default function favoritesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_FAVORITES: {
            return {
                ...state,
                loading: true,
            };
        }
        case LOAD_FAVORITES_SUCCESS: {
            return {
                ...state,
                loading: false,
                data: action.favorites.data,
                nextPage: action.favorites.nextPage,
            };
        }
        case LOAD_FAVORITES_NEXT_PAGE: {
            return {
                ...state,
                loadingMore: true,
            };
        }
        case LOAD_FAVORITES_NEXT_PAGE_SUCCESS: {
            return {
                ...state,
                loadingMore: false,
                data: [...state.data, ...action.favorites.data],
                nextPage: action.favorites.nextPage,
            };
        }
        case HANDLE_LIKE: {
            const newData = state.data.map(advert => {
                if (advert.id === action.advertId) {
                    advert.viewer_liked = !advert.viewer_liked;
                }

                return advert;
            });
            return {
                ...state,
                data: newData,
            };
        }
        default:
            return state;
    }
}
