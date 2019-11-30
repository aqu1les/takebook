import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./reducers/authReducer";

const reducers = combineReducers({
    auth: authReducer
});

export default createStore(reducers, applyMiddleware(ReduxThunk));