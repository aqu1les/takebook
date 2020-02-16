import { fetchAdverts, fetchNextPage } from '../services/AdvertsService';
import _ from 'lodash';
import { Store } from './Store';

class AdvertStore extends Store {
    state = {
        loading: false,
        adverts: [],
        nextPageUrl: null,
        loadingMore: false,
    };

    constructor() {
        super();
    }

    reducer(action, payload) {
        switch (action) {
            case 'LOAD': {
                this.state = { ...this.state, loading: true };
                break;
            }

            case 'LOAD_NEXT_PAGE': {
                this.state = { ...this.state, loadingMore: true };
                break;
            }

            case 'LOAD_SUCCESS': {
                this.state = {
                    ...this.state,
                    loading: false,
                    adverts: payload.adverts,
                    nextPageUrl: payload.nextPageUrl,
                };
                break;
            }

            case 'ADVERT_ACCEPTED': {
                this.state = {
                    ...this.state,
                    adverts: _.uniqBy(
                        [payload.advert, ...this.state.adverts],
                        'id',
                    ),
                };
                break;
            }

            case 'NEXT_PAGE_SUCCESS': {
                this.state = {
                    ...this.state,
                    loading: false,
                    adverts: _.uniqBy(
                        [...this.state.adverts, ...payload.adverts],
                        'id',
                    ),
                    nextPageUrl: payload.nextPageUrl,
                    loadingMore: false,
                };
                break;
            }
        }
        this.notify();
    }

    loadAdverts() {
        this.reducer('LOAD');
        fetchAdverts()
            .then(response => {
                if (response.data) {
                    const nextPage = response.data.next_page_url;
                    this.reducer('LOAD_SUCCESS', {
                        adverts: response.data.data,
                        nextPageUrl: nextPage ? nextPage.split('=')[1] : null,
                    });
                }
            })
            .catch(err => console.log(err));
    }

    loadNextPage() {
        this.reducer('LOAD_NEXT_PAGE');
        fetchNextPage(this.state.nextPageUrl)
            .then(response => {
                if (response.data) {
                    const nextPage = response.data.next_page_url;

                    this.reducer('NEXT_PAGE_SUCCESS', {
                        adverts: response.data.data,
                        nextPageUrl: nextPage ? nextPage.split('=')[1] : null,
                    });
                }
            })
            .catch(err => console.log(err));
    }

    advertAccepted(advert) {
        this.reducer('ADVERT_ACCEPTED', { advert });
    }
}
export default new AdvertStore();
