import { USER_ACTION_TYPES } from "./user.types";

//146 need this bcs when we initialize our application, we have no current user
const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
};

//153 bcz when reducer initializes, there's no state value
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload };
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null };
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:          
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, error: payload };
        default: 
            return state;
    }
};