import api from "../../api";

export function addCategoryAction(category) {
    return { type: "ADD_CATEGORY", category };
}

export function loadCategoriesAction() {
    return async dispatch => {
        const response = await api.get("/categories");
        if (!response || !response.data) return;
        dispatch({ type: "SET_CATEGORIES_INFO", info: { ...response.data, data: [] } });
        response.data.data.map(category => {
            return dispatch(addCategoryAction(category));
        });
    };
}