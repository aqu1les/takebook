import {
	fetchAdverts,
	fetchNextPage,
	getAdvert,
} from '../../services/AdvertsService';

export const ADD_ADVERT = 'ADD_ADVERT';

export const LOAD_ADVERTS = 'LOAD_ADVERTS';

export const LOAD_ADVERT = 'LOAD_ADVERT';

export const LOAD_ADVERT_SUCCESS = 'LOAD_ADVERT_SUCCESS';

export const LOAD_ADVERT_ERROR = 'LOAD_ADVERT_ERROR';

export const LOAD_ADVERTS_SUCCESS = 'LOAD_ADVERTS_SUCCESS';

export const LOAD_NEXT_PAGE_ADVERTS = 'LOAD_NEXT_PAGE_ADVERTS';

export const LOAD_NEXT_PAGE_ADVERTS_SUCCESS = 'LOAD_NEXT_PAGE_ADVERTS_SUCCESS';

function loadAdverts() {
	return { type: LOAD_ADVERTS };
}

export function loadSingleAdvert(advertId) {
	return async (dispatch) => {
		await dispatch({ type: LOAD_ADVERT, advertId });

		try {
			const response = await getAdvert(advertId);

			if (!response || !response.data) {
				throw new Error('');
			}

			await dispatch({
				type: LOAD_ADVERT_SUCCESS,
				advert: response.data,
			});
		} catch (e) {
			await dispatch({ type: LOAD_ADVERT_ERROR, advertId });
		}
	};
}

export function addAdvertAction(advert) {
	return { type: ADD_ADVERT, advert };
}

export function loadedAdverts(adverts) {
	return { type: LOAD_ADVERTS_SUCCESS, adverts };
}

// export function updateAdvertAction(advert) {
//     return async dispatch => {
//         const response = await api.put(`/books/${advert.id}`, {
//             id: advert.id,
//             status_id: advert.status_id,
//         });
//         if (!response || !response.data) return;
//         if (response.data.success || response.data.id) return { status: 'ok' };
//         return { error: response.data.error.message };
//     };
// }

export function loadAdvertsAction() {
	return async (dispatch) => {
		await dispatch(loadAdverts());
		try {
			const adverts = await fetchAdverts();
			await dispatch(loadedAdverts(adverts));
		} catch (e) {
			console.log(e);
		}
	};
}

function loadNextPage() {
	return { type: LOAD_NEXT_PAGE_ADVERTS };
}

export function nextPageLoadedAction(adverts) {
	return { type: LOAD_NEXT_PAGE_ADVERTS_SUCCESS, adverts };
}

export function loadNextPageAction(page) {
	return async (dispatch) => {
		await dispatch(loadNextPage());
		try {
			const adverts = await fetchNextPage(page);
			await dispatch(nextPageLoadedAction(adverts));
		} catch (e) {
			console.log(e);
		}
	};
}
