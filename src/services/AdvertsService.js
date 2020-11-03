import ApiService from './ApiService';

export function fetchAdverts() {
	const promise = new Promise((resolve, reject) => {
		ApiService.get('/books/approved')
			.then((res) => {
				if (!res || !res.data) {
					reject('ERROR FETCHING');
				}
				const nextPageUrl = res.data.next_page_url;
				resolve({
					data: res.data.data,
					nextPage: nextPageUrl ? nextPageUrl.split('=')[1] : null,
				});
			})
			.catch((err) => reject(err));
	});

	return promise;
}

export function getAdvert(advertId) {
	return ApiService.get(`/books/${advertId}`);
}

export function fetchNextPage(page) {
	const promise = new Promise((resolve, reject) => {
		ApiService.get(`/books/approved?page=${page}`)
			.then((res) => {
				if (!res || !res.data) {
					reject('ERROR FETCHING');
				}
				const nextPageUrl = res.data.next_page_url;
				resolve({
					data: res.data.data,
					nextPage: nextPageUrl ? nextPageUrl.split('=')[1] : null,
				});
			})
			.catch((err) => reject(err));
	});

	return promise;
}

export function fetchMyAdverts() {
	const promise = new Promise((resolve, reject) => {
		ApiService.get('/users/me/books')
			.then((res) => {
				if (!res || !res.data) {
					reject('ERROR FETCHING');
				}
				// const nextPageUrl = res.data.next_page_url;
				resolve({
					data: res.data,
					// nextPage: nextPageUrl ? nextPageUrl.split('=')[1] : null,
				});
			})
			.catch((err) => reject(err));
	});

	return promise;
}

export function fetchMyAdvertsNextPage(page) {
	const promise = new Promise((resolve, reject) => {
		ApiService.get(`/users/me/books?page=${page}`)
			.then((res) => {
				if (!res || !res.data) {
					reject('ERROR FETCHING');
				}
				const nextPageUrl = res.data.next_page_url;
				resolve({
					data: res.data.data,
					nextPage: nextPageUrl ? nextPageUrl.split('=')[1] : null,
				});
			})
			.catch((err) => reject(err));
	});

	return promise;
}

export function deleteAdvert(bookId) {
	return ApiService.delete(`books/${bookId}`);
}

export function createAdvert(body) {
	return ApiService.post('books', body);
}

export function updateAdvert(bookId, data) {
	return ApiService.put(`books/${bookId}`, data);
}

export function markAdvertAsSold(bookId, userId = null) {
	const data = userId ? { user_id: userId } : {};
	return ApiService.put(`books/${bookId}/owner/status`, data);
}
