import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL
} from "./types"
import category from "../apis/api";
import { errorHandler } from "../Utils/errorHandling";
import { configUtil } from "../Utils/apiConfig";

export const fetchAllCategory = ()=> async(dispatch) =>{
    try {
        dispatch({type:CATEGORY_LIST_REQUEST})
        console.log("function call>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",dispatch)
        const { data } = await category.get(
            `category/activeCategory`
        );
        console.log("data.................",data)
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        console.log("error..............................",error)
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: errorHandler(error),
        });
    }
}