import { types } from "../types/types";


export const authReducer=( state= {}, action)=> {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        case types.loggout:
            return {}
    
        default:
            return state;
    }
}