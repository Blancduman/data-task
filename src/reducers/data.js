import { FETCH_DATA, SORT_DATA, FETCH_FILTER } from "../actions/types";

const initialState = JSON.parse(localStorage.getItem("data")) || {
  data: [],
  showData: [],
  isFiltered: false,
  filteredData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA: {
      const newState = { data: action.payload, showData: action.payload };
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case SORT_DATA: {
      const newState = { ...state, showData: action.payload };
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case FETCH_FILTER: {
      const newState = {
        ...state,
        isFiltered: action.payload.status,
        filteredData: action.payload.filteredData
      };
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
