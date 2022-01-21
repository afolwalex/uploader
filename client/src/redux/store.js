import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	deleteImageReducer,
	getImagesReducer,
	postImageReducer,
} from "./reducer";

const middleware = [thunk];

const reducer = combineReducers({
	getImages: getImagesReducer,
	postImage: postImageReducer,
	deleteImage: deleteImageReducer,
});

const initialState = {};

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
