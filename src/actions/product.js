import product from "../apis/api";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAIL,
    FETCH_MEN_PRODUCT_REQUEST,
    FETCH_MEN_PRODUCT_SUCCESS,
    FETCH_MEN_PRODUCT_FAIL,
    FETCH_WOMEN_PRODUCT_REQUEST,
    FETCH_WOMEN_PRODUCT_SUCCESS,
    FETCH_WOMEN_PRODUCT_FAIL,
    FETCH_KIDS_PRODUCT_REQUEST,
    FETCH_KIDS_PRODUCT_SUCCESS,
    FETCH_KIDS_PRODUCT_FAIL,
    FETCH_LATEST_PRODUCT_REQUEST,
    FETCH_LATEST_PRODUCT_SUCCESS,
    FETCH_LATEST_PRODUCT_FAIL,
    FETCH_DISCOUNTED_PRODUCT_REQUEST,
    FETCH_DISCOUNTED_PRODUCT_SUCCESS,
    FETCH_DISCOUNTED_PRODUCT_FAIL,
    PRODUCTS_YOU_MAY_LIKE_REQUEST,
    PRODUCTS_YOU_MAY_LIKE_SUCCESS,
    PRODUCTS_YOU_MAY_LIKE_FAIL,
} from "./types";
import { errorHandler } from "../Utils/errorHandling";
import { configUtil } from "../Utils/apiConfig";

// Fetch all products
export const fetchAllProducts =
    (keyword = "",searchCategory = "", pageNumber = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });
            const { data } = await product.get(
                `product/productList?name=${keyword}&categoryId=${searchCategory}&pageNumber=${pageNumber}`
            );
            console.log("inside product action ......................",data)
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: errorHandler(error),
            });
        }
    };

// Fetch lastest products;
export const fetchLatestProducts = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_LATEST_PRODUCT_REQUEST });
        const { data } = await product.get(`/products/new-arrivals`);
        dispatch({ type: FETCH_LATEST_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FETCH_LATEST_PRODUCT_FAIL,
            payload: errorHandler(error),
        });
    }
};

// Fetch a product
export const listProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST });
        const { data } = await product.get(`/product/${productId}`);
        dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCT_FAIL,
            payload: errorHandler(error),
        });
    }
};

// Create a product
export const createProduct = (productObj) => async (dispatch, getState) => {
    const { userInfo } = getState().userAuth;
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST });
        const { data } = await product.post(
            `/product`,
            { ...productObj },
            configUtil(userInfo.token)
        );
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAIL, payload: errorHandler(error) });
    }
};

// Edit a product
export const editProduct =
    (productObj, productId, removedImages, newImages) =>
    async (dispatch, getState) => {
        const { userInfo } = getState().userAuth;
        try {
            dispatch({ type: EDIT_PRODUCT_REQUEST });
            const { data } = await product.patch(
                `/product/${productId}`,
                { ...productObj, removedImages, newImages },
                configUtil(userInfo.token)
            );
            dispatch({ type: EDIT_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: EDIT_PRODUCT_FAIL, payload: errorHandler(error) });
        }
    };

// Delete a product
export const deleteProduct = (productId) => async (dispatch, getState) => {
    const { userInfo } = getState().userAuth;
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        await product.delete(
            `/product/${productId}`,
            configUtil(userInfo.token)
        );
        dispatch({ type: DELETE_PRODUCT_SUCCESS });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: errorHandler(error) });
    }
};

export const getMenProduct =
    (
        sortBy = "new-arrivals",
        category = "all",
        color = "all",
        priceFrom = "0",
        priceTo = "1000000",
        pageNumber = ""
    ) =>
    async (dispatch, getState) => {
        try {
            const { currency } = getState().settings;
            dispatch({ type: FETCH_MEN_PRODUCT_REQUEST });
            const { data } = await product.get(
                `/products/men?sortBy=${sortBy}&currency=${currency}&category=${category}&color=${color}&priceFrom=${priceFrom}&priceTo=${priceTo}&pageNumber=${pageNumber}&gender=men`
            );

            dispatch({ type: FETCH_MEN_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: FETCH_MEN_PRODUCT_FAIL,
                payload: errorHandler(error),
            });
        }
    };

export const getWomenProduct =
    (
        sortBy = "new-arrivals",
        category = "all",
        color = "all",
        priceFrom = "0",
        priceTo = "1000000",
        pageNumber = ""
    ) =>
    async (dispatch, getState) => {
        try {
            const { currency } = getState().settings;
            dispatch({ type: FETCH_WOMEN_PRODUCT_REQUEST });
            const { data } = await product.get(
                `/products/women?sortBy=${sortBy}&currency=${currency}&category=${category}&color=${color}&priceFrom=${priceFrom}&priceTo=${priceTo}&pageNumber=${pageNumber}&gender=women`
            );
            dispatch({ type: FETCH_WOMEN_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: FETCH_WOMEN_PRODUCT_FAIL,
                payload: errorHandler(error),
            });
        }
    };

export const getKidsProduct =
    (
        sortBy = "new-arrivals",
        category = "all",
        color = "all",
        priceFrom = "0",
        priceTo = "1000000",
        pageNumber = ""
    ) =>
    async (dispatch, getState) => {
        const { currency } = getState().settings;
        try {
            dispatch({ type: FETCH_KIDS_PRODUCT_REQUEST });
            const { data } = await product.get(
                `/products/kids?sortBy=${sortBy}&currency=${currency}&category=${category}&color=${color}&priceFrom=${priceFrom}&priceTo=${priceTo}&pageNumber=${pageNumber}&gender=kids`
            );
            dispatch({ type: FETCH_KIDS_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: FETCH_KIDS_PRODUCT_FAIL,
                payload: errorHandler(error),
            });
        }
    };

// /products/discount

export const getDiscountedProduct =
    (
        sortBy = "new-arrivals",
        category = "all",
        color = "all",
        priceFrom = "0",
        priceTo = "1000000",
        pageNumber = ""
    ) =>
    async (dispatch, getState) => {
        const { currency } = getState().settings;
        try {
            dispatch({ type: FETCH_DISCOUNTED_PRODUCT_REQUEST });
            const { data } = await product.get(
                `/products/discount?sortBy=${sortBy}&currency=${currency}&category=${category}&color=${color}&priceFrom=${priceFrom}&priceTo=${priceTo}&pageNumber=${pageNumber}&discount=true`
            );
            dispatch({ type: FETCH_DISCOUNTED_PRODUCT_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: FETCH_DISCOUNTED_PRODUCT_FAIL,
                payload: errorHandler(error),
            });
        }
    };

export const getProductsYouMayLike =
    (price, gender, pid) => async (dispatch, getState) => {
        try {
            const { currency } = getState().settings;
            dispatch({ type: PRODUCTS_YOU_MAY_LIKE_REQUEST });
            const { data } = await product.get(
                `/products-you-may-like?price=${price}&gender=${gender}&currency=${currency}&id=${pid}`
            );

            dispatch({ type: PRODUCTS_YOU_MAY_LIKE_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: PRODUCTS_YOU_MAY_LIKE_FAIL,
                payload: errorHandler(error),
            });
        }
    };
