const INITIAL_STATE = {
    data: []
};

export default function advertsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "SET_ADVERTS_INFO":
            return { ...action.info, data: [...state.data] };
        case "ADD_ADVERT":
            const adverts = state.data.filter(advert => advert.id !== action.advert.id);
            return { ...state, data: [...adverts, action.advert] };
        case "CLEAR_ADVERTS":
            return { ...state, data: [] };
        default:
            return state;
    }
};