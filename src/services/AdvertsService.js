import ApiService from './ApiService';

export function fetchAdverts() {
    const promise = new Promise((resolve, reject) => {
        ApiService.get('/books/approved')
            .then(res => {
                if (!res || !res.data) reject('ERROR FETCHING');
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

export function fetchNextPage(page) {
    const promise = new Promise((resolve, reject) => {
        ApiService.get(`/books/approved?page=${page}`)
            .then(res => {
                if (!res || !res.data) reject('ERROR FETCHING');
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
