import { FETCH_DATA } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return [...state, ...action.payload];
    case "minus1":
      return [...action.payload];
    default:
      return state;
  }
};
