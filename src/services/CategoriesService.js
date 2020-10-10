import ApiService from './ApiService';

export function getCategories() {
	return ApiService.get('/categories');
}
