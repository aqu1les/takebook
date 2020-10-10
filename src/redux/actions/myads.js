import {
	fetchMyAdverts,
	fetchMyAdvertsNextPage,
} from '../../services/AdvertsService';

export const LOAD_MY_ADVERTS = 'LOAD_MY_ADVERTS';

export const LOAD_MY_ADVERTS_SUCCESS = 'LOAD_MY_ADVERTS_SUCCESS';

export const LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS =
	'LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS';

export const LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS_SUCCESS =
	'LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS_SUCCESS';

function loadMyAdverts() {
	return { type: LOAD_MY_ADVERTS };
}

function loadedMyAdverts(adverts) {
	return { type: LOAD_MY_ADVERTS_SUCCESS, adverts };
}

export function loadMyAdvertsAction() {
	return async (dispatch) => {
		await dispatch(loadMyAdverts());
		try {
			const adverts = await fetchMyAdverts();
			await dispatch(loadedMyAdverts(adverts));
		} catch (e) {
			console.log(e);
		}
	};
}

function loadMyAdvertsNextPage() {
	return { type: LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS };
}

export function myAdvertsNextPageLoadedAction(adverts) {
	return { type: LOAD_MY_ADVERTS_NEXT_PAGE_ADVERTS_SUCCESS, adverts };
}

export function loadMyAdvertsNextPageAction(page) {
	return async (dispatch) => {
		await dispatch(loadMyAdvertsNextPage());
		try {
			const adverts = await fetchMyAdvertsNextPage(page);
			await dispatch(myAdvertsNextPageLoadedAction(adverts));
		} catch (e) {
			console.log(e);
		}
	};
}
