import {
  GET_SUBSCRIPTIONS,
  GET_CURRENT_SUBSCRIPTION,
  MAKE_SUBSCRIPTION,
} from "../Actions/actions";

const initialState = {
  subscriptions: [],
  currentsubscription: [],
  makesubscription: [],
  loading: false,
  waitingmpesa: false,
  confirmationstatus: false,
  confirmation: [],
};

const getAllSubscriptions = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
      };
    case "PAYMENT_CONFIRMATION":
      return {
        ...state,
        confirmation: action.confirmation,
        confirmationstatus: action.confirmation.status,
        waitingmpesa: action.confirmation.waitingmpesa,
        loading: false,
      };
    case GET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.subscriptions,
        loading: false,
      };
    case GET_CURRENT_SUBSCRIPTION:
      return {
        ...state,
        currentsubscription: action.currentsubscription,
        loading: false,
      };
    case MAKE_SUBSCRIPTION:
      return {
        ...state,
        loading: false,
        waitingmpesa: action.madesubscription,
      };
    default:
      return {
        state,
      };
  }
};

export default getAllSubscriptions;
