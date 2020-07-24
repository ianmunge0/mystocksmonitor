import { PROFIT, TOTAL_SALES, TOTAL_PURCHASES, TOTAL_EXPENSES, TOTAL_BAD_STOCK } from "../Actions/actions";

const initialState = {
    profit: "",
    sales: "",
    purchases: "",
    expenses: "",
    badstock: "",
};

const addCurrentCash = (state = initialState, action) =>{
    switch (action.type){
        case PROFIT:
            return{
                ...state,
                profit: action.profit,
            };
        case TOTAL_SALES:
            return{
                ...state,
                sales: action.sales,
            };
        case TOTAL_PURCHASES:
            return{
                ...state,
                purchases: action.purchases,
            };
        case TOTAL_EXPENSES:
            return{
                ...state,
                expenses: action.expenses,
            };
        case TOTAL_BAD_STOCK:
            return{
                ...state,
                badstock: action.badstock,
            };
        default:
            return{
                state
            }
    }

}

export default addCurrentCash;