import { combineReducers } from "redux";
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productEditReducer,
    mensProductReducer,
    womenProductReducer,
    kidsProductReducer,
    latestProductReducer,
    discountProductReducer,
    productsYouMayLikeReducer,
} from "./productReducers";
import { cartReducer } from "./cartReducers";
import { changeSettingsReducer } from "./settingsReducers";
import {
    userAuthenticationReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userUpdatePasswordReducer,
    userUpdateLanguageReducer,
    userListReducer,
    userDeleteReducer,
    userEditReducer,
} from "./userReducers";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    checkoutWithStripeReducer,
    getUserOrdersReducer,
    listAllOrdersReducer,
    deleteOrderReducer,
    orderDeliverReducer,
} from "./orderReducers";

import {categoryListReducer} from "./categoryReducers"

export default combineReducers({
    // Product
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    menProduct: mensProductReducer,
    womenProduct: womenProductReducer,
    kidsProduct: kidsProductReducer,
    latestProducts: latestProductReducer,
    discountedProducts: discountProductReducer,
    productsYouMayLike: productsYouMayLikeReducer,
    // Cart
    cart: cartReducer,
    // Settings
    settings: changeSettingsReducer,
    // User
    userAuth: userAuthenticationReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    updateUserPassword: userUpdatePasswordReducer,
    updateUserLanguage: userUpdateLanguageReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userEdit: userEditReducer,
    // Orders
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    checkoutWithStripe: checkoutWithStripeReducer,
    userOrders: getUserOrdersReducer,
    listOrders: listAllOrdersReducer,
    orderDelete: deleteOrderReducer,
    orderDeliver: orderDeliverReducer,
    // category
    categoryList:categoryListReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null;

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null;

const userShippingInfoFromStrage = localStorage.getItem("userShippingInfo")
    ? JSON.parse(localStorage.getItem("userShippingInfo"))
    : null;

const settingsFromStorage = localStorage.getItem("settings")
    ? JSON.parse(localStorage.getItem("settings"))
    : { language: "en", country: "hk", currency: "hkd" };

export const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
        userShippingInfo: userShippingInfoFromStrage,
    },
    settings: settingsFromStorage,
    userAuth: { userInfo: userInfoFromStorage },
};
