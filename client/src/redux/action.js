import axios from "axios";
import * as types from "./constant";

const url = "http://localhost:5000";

const config_headers = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
};

export const get_images = () => async (dispatch) => {
	try {
		dispatch({ type: types.GET_IMAGES_REQUEST });

		const { data } = await axios.get(`${url}/api/image`, {
			headers: config_headers,
		});

		if (data.status === "ok") {
			dispatch({ type: types.GET_IMAGES_SUCCESS, payload: data.images });
		}
	} catch (error) {
		const message = error.response
			? error.response.data.message
			: "Network Error";
		dispatch({ type: types.GET_IMAGES_FAIL, payload: message });
	}
};

export const post_images = (obj) => async (dispatch) => {
	try {
		dispatch({ type: types.POST_IMAGE_REQUEST });

		const { data } = await axios.post(`${url}/api/image`, obj, {
			headers: config_headers,
		});

		if (data.status === "ok") {
			dispatch({ type: types.POST_IMAGE_SUCCESS, payload: data.image });
		}
	} catch (error) {
		const message = error.response
			? error.response.data.message
			: "Network Error";
		dispatch({ type: types.POST_IMAGE_FAIL, payload: message });
	}
};

export const delete_image = (id) => async (dispatch) => {
	try {
		dispatch({ type: types.DELETE_IMAGE_REQUEST });

		const { data } = await axios.delete(`${url}/api/image/${id}`, {
			headers: config_headers,
		});

		if (data.status === "ok") {
			dispatch({ type: types.DELETE_IMAGE_SUCCESS, payload: data.data });
		}
	} catch (error) {
		const message = error.response
			? error.response.data.message
			: "Network Error";
		dispatch({ type: types.DELETE_IMAGE_FAIL, payload: message });
	}
};
