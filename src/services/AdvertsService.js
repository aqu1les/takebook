import ApiService from "./ApiService";

export function fetchAdverts() {
    return ApiService.get('/books/approved');
}

export function fetchNextPage(page) {
    return ApiService.get(`/books/approved?page=${page}`);
}

