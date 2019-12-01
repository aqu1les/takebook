import api from "../../api";

export function addAdvertAction(advert) {
    return { type: "ADD_ADVERT", advert };
}

export function updateAdvertAction(advert) {
    return async dispatch => {
        const response = await api.put(`/books/${advert.id}/status`, advert);
        if (!response || !response.data) return;
        if (response.data.success || response.data.id) return dispatch(addAdvertAction(response.data));
        return { error: response.data.error.message };
    }
}

export function loadAdvertsAction() {
    return async dispatch => {
        const response = await api.get("/books");
        if (!response || !response.data) return;
        dispatch({ type: "SET_ADVERTS_INFO", info: { ...response.data, data: [] } });
        response.data.data.map(advert => {
            return dispatch(addAdvertAction(advert));
        });
    };
}
export function loadAdvertPage(page) {
    return async dispatch => {
        const response = await api.get(`/books?page=${page}`);
        if (!response || !response.data) return;
        await dispatch({ type: "CLEAR_ADVERTS" });
        dispatch({ type: "SET_ADVERTS_INFO", info: { ...response.data, data: [] } });
        response.data.data.map(advert => {
            return dispatch(addAdvertAction(advert));
        });
    }
}