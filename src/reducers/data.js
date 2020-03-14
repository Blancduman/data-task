import { FETCH_DATA, SORT_DATA } from "../actions/types";

const initialState = {
  data: [],
  sorted: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { data: action.payload, sorted: action.payload };
    case SORT_DATA:
      return { ...state, sorted: action.payload };
    default:
      return state;
  }
};
