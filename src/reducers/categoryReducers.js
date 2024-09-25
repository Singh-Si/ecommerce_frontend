import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL
} from "../actions/types"

export const categoryListReducer = (state={},action)=>{
    switch(action.type){
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: action.payload };
        case CATEGORY_LIST_SUCCESS:
            return {
                loading: false,
                categories: action.payload.data,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}