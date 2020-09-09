import { GET_SUBSCRIPTIONS } from "../Actions/actions";

const initialState = {
    subscriptions: "",
};

const getAllSubscriptions = (state = initialState, action) =>{
    switch (action.type){
        case GET_SUBSCRIPTIONS:
            return{
                ...state,
                subscriptions: action.subscriptions
            };
        default:
            return{
                state
            }
    }

}

export default getAllSubscriptions;