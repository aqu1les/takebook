import {
    LOAD_ADVERTS,
    LOAD_ADVERTS_SUCCESS,
    LOAD_NEXT_PAGE_ADVERTS,
    LOAD_NEXT_PAGE_ADVERTS_SUCCESS,
    ADD_ADVERT,
} from '../actions/advert';

const INITIAL_STATE = {
    loading: false,
    loadingMore: false,
    data: [],
    nextPage: null,
};

export default function advertsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
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
                data: action.adverts.data,
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
                data: [action.advert, ...state.data],
            };
        }
        default:
            return state;
    }
}
