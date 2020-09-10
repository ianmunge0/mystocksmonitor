import { GET_SUBSCRIPTIONS, GET_CURRENT_SUBSCRIPTION } from "../Actions/actions";

const initialState = {
    subscriptions: [],
    currentsubscription: [],
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
        default:
            return{
                state
            }
    }

}

export default getAllSubscriptions;