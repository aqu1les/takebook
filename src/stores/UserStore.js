import { authenticateUser, getUser, removeToken, storeToken } from "../services/UserService";
import { loadUserLikes, likeBook } from "../services/LikeService";
import { Store } from "./Store";

class UserStore extends Store {
    state = {
        loading: false,
        authenticated: false,
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        address: {
            street: '',
            number: null,
            neighborhood: '',
            city: '',
            state: '',
            zipCode: null
        },
        avatar_url: null,
        likes: [],
        notifications: [],
    };

    constructor() {
        super();
    }

    reducer(action, payload) {
        switch (action) {
            case 'LOAD_INFO': {
                this.state = { ...this.state, loading: true };
                break;
            }
            case 'LOAD_INFO_SUCCESS': {
                this.state = {
                    ...this.state,
                    loading: false,
                    authenticated: true,
                    id: payload.id,
                    firstName: payload.first_name,
                    lastName: payload.last_name,
                    email: payload.email,
                    address: {
                        street: payload.address_street,
                        number: payload.address_number,
                        neighborhood: payload.address_neighborhood,
                        city: payload.address_city,
                        state: payload.address_state,
                        zipCode: payload.address_zip_code
                    },
                    avatar_url: payload.avatar_url,
                    notifications: payload.notifications,
                };
                break;
            }
            case 'LOAD_LIKES_SUCCESS': {
                this.state = { ...this.state, likes: payload.likes };
                break;
            }
            case 'LIKE_BOOK': {
                const liked_books = this.state.likes.filter(book => book.id === payload.book.id).length > 0 ?
                    this.state.likes.filter(book => book.id !== payload.book.id) : [payload.book, ...this.state.likes];
                this.state = { ...this.state, likes: liked_books };
                break;
            }
            case 'NEW_NOTIFICATION': {
                this.state = { ...this.state, notifications: [payload.notification, ...this.state.notifications] };
                break;
            }
            case 'LOG_OFF': {
                this.state = {
                    loading: false,
                    authenticated: false,
                    id: null,
                    firstName: '',
                    lastName: '',
                    email: '',
                    address: {
                        street: '',
                        number: null,
                        neighborhood: '',
                        city: '',
                        state: '',
                        zipCode: null
                    },
                    avatar_url: null,
                    likes: [],
                    notifications: [],
                };
                break;
            }
        }
        this.notify();
    }

    async login(email, password, remind) {
        this.reducer('LOAD_INFO');
        const response = await authenticateUser(email, password, remind);
        this.loadLikes();
        if (response.data) {
            this.reducer('LOAD_INFO_SUCCESS', { ...response.data.user, token: response.data.token });
            storeToken(response.data.token);
        }
        return response;
    }

    logout() {
        this.reducer('LOG_OFF');
        removeToken();
    }

    loadUserInfo() {
        this.reducer('LOAD_INFO');
        this.loadLikes();
        getUser()
            .then(response => {
                if (response.data) {
                    this.reducer('LOAD_INFO_SUCCESS', { ...response.data });
                }
            })
            .catch(err => console.log(err));
    }

    loadLikes() {
        loadUserLikes()
            .then(response => {
                this.reducer('LOAD_LIKES_SUCCESS', { likes: response.data });
            })
            .catch(err => console.log(err));
    }

    likeBook(bookId) {
        likeBook(bookId)
            .then(response => {
                this.reducer('LIKE_BOOK', { book: response.data });
            })
            .catch(err => console.log(err));
    }

    newNotification(notification) {
        this.reducer('NEW_NOTIFICATION', { notification });
    }
}

export default new UserStore();