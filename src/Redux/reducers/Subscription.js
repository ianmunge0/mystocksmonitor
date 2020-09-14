import { GET_SUBSCRIPTIONS, GET_CURRENT_SUBSCRIPTION, MAKE_SUBSCRIPTION } from "../Actions/actions";

const initialState = {
    subscriptions: [],
    currentsubscription: [],
    makesubscription: [],
    loading:true
};

const getAllSubscriptions = (state = initialState, action) =>{
    switch (action.type){
        case GET_SUBSCRIPTIONS:
            return{
                ...state,
                subscriptions: action.subscriptions,
                loading:false
            };
        case GET_CURRENT_SUBSCRIPTION:
            return{
                ...state,
                currentsubscription: action.currentsubscription,
                loading:false
            };
        case MAKE_SUBSCRIPTION:
            return{
                ...state,
                makesubscription: action.makesubscription,
                loading:false
            };
        default:
            return{
                state
            }
    }

}

export default getAllSubscriptions;