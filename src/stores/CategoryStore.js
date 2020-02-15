import { getCategories } from "../services/CategoriesService";


class CategoryStore {
    observers = [];
    state = {
        loading: false,
        categories: [],
        nextPageUrl: null
    };

    constructor() {
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

    notify() {
        this.observers.forEach(observer => observer(this.state));
    }

    subscribe(newObserver) {
        this.observers.push(newObserver);
        this.notify();
        return () => {
            this.observers = this.observers.filter(observer => observer !== newObserver);
        }
    }
}
export default new CategoryStore();