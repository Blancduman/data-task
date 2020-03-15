import { FETCH_DATA, SORT_DATA, FETCH_FILTER } from "../actions/types";

const initialState = {
  data: [],
  showData: [],
  isFiltered: false,
  filteredData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { data: action.payload, showData: action.payload };
    case SORT_DATA:
      return { ...state, showData: action.payload };
    case FETCH_FILTER:
      return {
        ...state,
        isFiltered: action.payload.status,
        filteredData: action.payload.filteredData
      };
    default:
      return state;
  }
};
