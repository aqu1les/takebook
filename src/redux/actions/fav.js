import { loadUserLikes, likeBook } from '../../services/LikeService';

export const LOAD_FAVORITES = 'LOAD_FAVORITES';

export const LOAD_FAVORITES_SUCCESS = 'LOAD_FAVORITES_SUCCESS';

export const LOAD_FAVORITES_NEXT_PAGE = 'LOAD_FAVORITES_NEXT_PAGE';

export const HANDLE_LIKE = 'HANDLE_LIKE';

export const LOAD_FAVORITES_NEXT_PAGE_SUCCESS =
    'LOAD_FAVORITES_NEXT_PAGE_SUCCESS';

function loadFavorites() {
    return { type: LOAD_FAVORITES };
}

function loadedFavorites(favorites) {
    return { type: LOAD_FAVORITES_SUCCESS, favorites };
}

export function loadFavoritesAction() {
    return async dispatch => {
        await dispatch(loadFavorites());
        try {
            const favorites = await loadUserLikes();
            await dispatch(loadedFavorites(favorites));
        } catch (e) {
            console.log(e);
        }
    };
}

export function handleLikeAction(advertId) {
    return async dispatch => {
        try {
            await likeBook(advertId);
            dispatch({ type: HANDLE_LIKE, advertId });
            dispatch(loadFavoritesAction());
        } catch (e) {
            console.log(e);
        }
    };
}

function loadFavoritesNextPage() {
    return { type: LOAD_FAVORITES_NEXT_PAGE };
}

function favoritesNextPageLoadedAction(favorites) {
    return { type: LOAD_FAVORITES_NEXT_PAGE_SUCCESS, favorites };
}

// export function loadFavoritesNextPageAction(page) {
//     return async dispatch => {
//         await dispatch(loadFavoritesNextPage());
//         try {
//             const favorites = await fetchNextPage(page);
//             await dispatch(favoritesNextPageLoadedAction(favorites));
//         } catch (e) {
//             console.log(e);
//         }
//     };
// }
