import * as ActionTypes from './ActionTypes'

export const Dishes = (state = {
    isLoading:true,
    errmsg:null,
    dishes:[]
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errmsg:null, dishes:action.payload}
        
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errmsg:null, dishes:[]}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errmsg:action.payload, dishes:[]}

        default:
            return state;
    }
}