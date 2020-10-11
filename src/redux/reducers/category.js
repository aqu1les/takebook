import { SET_CATEGORIES_INFO, ADD_CATEGORY } from '../actions/category';

const INITIAL_STATE = {
	data: [],
};

export default function categoriesReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_CATEGORIES_INFO:
			return { ...action.info, data: [...state.data] };
		case ADD_CATEGORY:
			return {
				...state,
				data: [
					...state.data.filter(
						(category) => category.id !== action.category.id,
					),
					action.category,
				],
			};
		default:
			return state;
	}
}
