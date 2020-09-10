import { GET_SUBSCRIPTIONS } from "../Actions/actions";

const initialState = {
    subscriptions: [],
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
        default:
            return{
                state
            }
    }

}

export default getAllSubscriptions;