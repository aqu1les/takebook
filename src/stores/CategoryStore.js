import { getCategories } from "../services/CategoriesService";
import { Store } from "./Store";


class CategoryStore extends Store {
    state = {
        loading: false,
        categories: [],
        nextPageUrl: null
    };

    constructor() {
        super();
        this.loadCategories();
    }

    reducer(action, payload) {
        switch (action) {
            case 'LOAD': {
                this.state = { ...this.state, loading: true };
                break;
            }
            case 'LOAD_SUCCESS': {
                this.state = { ...this.state, loading: false, categories: payload.categories, nextPageUrl: payload.nextPageUrl };
                break;
            }
        }
        this.notify();
    }

    loadCategories() {
        this.reducer('LOAD');
        getCategories()
            .then(response => {
                this.reducer('LOAD_SUCCESS', {
                    categories: response.data.data,
                    nextPageUrl: response.data.next_page_url
                })
            })
            .catch(error => console.log(error));
    };
}
export default new CategoryStore();