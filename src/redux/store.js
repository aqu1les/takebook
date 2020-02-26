import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import advertsReducer from './reducers/advert';
import categoriesReducer from './reducers/category';
import authReducer from './reducers/authentication';
import notificationsReducer from './reducers/notification';
import chatsReducer from './reducers/chat';
import favoritesReducer from './reducers/fav';

const reducers = combineReducers({
    adverts: advertsReducer,
    auth: authReducer,
    categories: categoriesReducer,
    notifications: notificationsReducer,
    chats: chatsReducer,
    likes: favoritesReducer,
});

export default createStore(reducers, applyMiddleware(ReduxThunk));
