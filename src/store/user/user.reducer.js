import { USER_ACTION_TYPES } from "./user.types";

//146 need this bcs when we initialize our application, we have no current user
const INITIAL_STATE = {
    currentUser: null
}

//153 bcz when reducer initializes, there's no state value
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return { ...state, currentUser: payload };
        default: 
            return state;
    }
};