import { FETCH_DATA, SORT_DATA, FETCH_FILTER, DELETE } from "../actions/types";

const initialState = JSON.parse(localStorage.getItem("data")) || {
  data: [],
  showData: []
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
        showData: action.payload.filteredData
      };
      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    case DELETE: {
      const newShowData = state.showData.filter(
        ({ id }) => action.payload.indexOf(id) === -1
      );
      const newData = state.data.filter(
        ({ id }) => action.payload.indexOf(id) === -1
      );
      const newState = {
        ...state,
        showData: newShowData,
        data: newData
      };

      localStorage.setItem("data", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
