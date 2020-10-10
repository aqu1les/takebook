import { getCategories } from '../../services/CategoriesService';

export const ADD_CATEGORY = 'ADD_CATEGORY';

export const SET_CATEGORIES_INFO = 'SET_CATEGORIES_INFO';

export function addCategoryAction(category) {
	return { type: ADD_CATEGORY, category };
}

export function loadCategoriesAction() {
	return async (dispatch) => {
		const response = await getCategories();
		if (!response || !response.data) {
			return;
		}
		response.data.data.map((category) => {
			return dispatch(addCategoryAction(category));
		});

		dispatch({
			type: SET_CATEGORIES_INFO,
			info: { ...response.data },
		});
	};
}
