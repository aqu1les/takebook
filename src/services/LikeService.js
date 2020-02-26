import ApiService from './ApiService';

export async function loadUserLikes() {
    const promise = new Promise((resolve, reject) => {
        ApiService.get('users/me/likes')
            .then(res => {
                if (!res || !res.data) reject('ERROR FETCHING FAVORITES');
                const nextPageUrl = res.data.next_page_url;
                resolve({
                    data: res.data.data,
                    nextPage: nextPageUrl ? nextPageUrl.split('=')[1] : null,
                });
            })
            .catch(err => reject(err));
    });

    return promise;
}

export function likeBook(advertId) {
    return ApiService.post(`users/me/likes/${advertId}`);
}
