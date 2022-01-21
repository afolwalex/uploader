import * as types from "./constant";

export const getImagesReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case types.GET_IMAGES_REQUEST:
			return { ...state, loading: true };
		case types.GET_IMAGES_SUCCESS:
			return { loading: false, images: action.payload };
		case types.GET_IMAGES_FAIL:
			return { loading: false, error: action.payload };
		case types.GET_IMAGES_RESET:
			return {};
		default:
			return state;
	}
};

export const postImageReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case types.POST_IMAGE_REQUEST:
			return { ...state, loading: true };
		case types.POST_IMAGE_SUCCESS:
			return { loading: false, image: action.payload, success: true };
		case types.POST_IMAGE_FAIL:
			return { loading: false, error: action.payload };
		case types.POST_IMAGE_RESET:
			return {};
		default:
			return state;
	}
};

export const deleteImageReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case types.DELETE_IMAGE_REQUEST:
			return { ...state, loading: true };
		case types.DELETE_IMAGE_SUCCESS:
			return { loading: false, image: action.payload, success: true };
		case types.DELETE_IMAGE_FAIL:
			return { loading: false, error: action.payload };
		case types.DELETE_IMAGE_RESET:
			return {};
		default:
			return state;
	}
};
