import ApiService from './ApiService';


export async function loadUserLikes() {
    return ApiService.get('users/me/likes');
}

export function likeBook(bookId) {
    return ApiService.post(`users/me/likes/${bookId}`);
}