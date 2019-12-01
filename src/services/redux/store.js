import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import advertsReducer from "./reducers/advertsReducer";

const reducers = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    adverts: advertsReducer
});

export default createStore(reducers, applyMiddleware(ReduxThunk));