import { CASH_AT_HAND } from "../Actions/actions";

const initialState = {
    cashathand: ""
};

const addCurrentCash = (state = initialState, action) =>{
    switch (action.type){
        case CASH_AT_HAND:
            return{
                ...state,
                cashathand: action.cashathand
            };
        default:
            return{
                state
            }
    }

}

export default addCurrentCash;