import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_LANGUAGE_REQUEST,
    USER_UPDATE_LANGUAGE_SUCCESS,
    USER_UPDATE_LANGUAGE_FAIL,
    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PASSWORD_FAIL,
    USER_ORDER_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL,
} from "./types";

import user from "../apis/api";
import { configUtil } from "../Utils/apiConfig";
import { errorHandler } from "../Utils/errorHandling";
import { useHistory } from "react-router-dom";


export const login = (email, password) => async (dispatch) => {
    
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await user.post(
            "/user/login",
            { email, password },
            config
        );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = (userId) => async (dispatch, getState) => {
    const { token } = getState().userAuth.userInfo;
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await user.post(
            "/user/logOut",
            {
                userId: userId,
                token: token,
            },
            config
        );
        dispatch({ type: USER_LOGOUT, payload: data });
        localStorage.removeItem("userInfo");
        dispatch({ type: USER_DETAILS_RESET });
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("paymentMethod");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("userShippingInfo");
        dispatch({ type: USER_ORDER_RESET });
        dispatch({ type: USER_LIST_RESET });
    } catch (error) {
        console.log(error);
    }
};

// Register
export const register =
    (username, email, password, language, token) => async (dispatch) => {
        try {
            console.log('done')
            dispatch({ type: USER_REGISTER_REQUEST });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await user.post(
                "user/user",
                { username, email, password, language, token },
                config
            );
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
            localStorage.setItem("userInfo", JSON.stringify(data));
      
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// Get user Info
export const getUserInfo = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { userInfo } = getState().userAuth;
        const { token } = userInfo;

        const { data } = await user.get(`/user/getUserById?id=${id}`, configUtil(token));

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Update User Language
export const updateLanguage = (language) => async (dispatch, getState) => {
    const { userInfo } = getState().userAuth;
    try {
        dispatch({ type: USER_UPDATE_LANGUAGE_REQUEST });
        const { data } = await user.patch(
            `/user/${userInfo._id}`,
            { language },
            configUtil(userInfo.token)
        );
        dispatch({ type: USER_UPDATE_LANGUAGE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_LANGUAGE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// Update User Password
export const updatePassword =
    (currentPassword, password) => async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;
        try {
            dispatch({ type: USER_UPDATE_PASSWORD_REQUEST });
            const { data } = await user.patch(
                `/user/${userInfo._id}`,
                { currentPassword, password },
                configUtil(userInfo.token)
            );
            dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: USER_UPDATE_PASSWORD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// Update user Info
export const updateUserProfile =

    ( firstName,
        lastName,
        email,
        city,
        addressLine1,
        addressLine2,
        country,mobileNumber,state) =>
    async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;
        const { token } = userInfo;
        // const history = useHistory()
        try {
            dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

            const { data } = await user.put(
                `/user/updateUser`,
                {
                    firstName,
                    lastName,
                    email,
                    city,
                    addressLine1,
                    addressLine2,
                    country,mobileNumber,state
                },
                configUtil(token)
            );
            dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
            window.location.href ="/"
            // history.push('/')
        } catch (error) {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: errorHandler(error),
            });
        }
    };

// Admin Actions

export const listUsers =
    (keyword = "", pageNumber = "") =>
    async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;
        try {
            dispatch({ type: USER_LIST_REQUEST });
            const { data } = await user.get(
                `/users?keyword=${keyword}&pageNumber=${pageNumber}`,
                configUtil(userInfo.token)
            );
            dispatch({ type: USER_LIST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: USER_LIST_FAIL,
                payload: errorHandler(error),
            });
        }
    };

export const adminUpdateUser =
    (userId, items) => async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;

        try {
            dispatch({ type: USER_EDIT_REQUEST });

            const { data } = await user.patch(
                `/user/${userId}/admin`,
                { ...items },
                configUtil(userInfo.token)
            );

            dispatch({ type: USER_EDIT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: USER_EDIT_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteUser = (userId) => async (dispatch, getState) => {
    const { userInfo } = getState().userAuth;
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        await user.delete(`/user/${userId}/admin`, configUtil(userInfo.token));
        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        dispatch({ type: USER_DELETE_FAIL, payload: errorHandler(error) });
    }
};
