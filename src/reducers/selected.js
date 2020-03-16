import { SELECT, FETCH_DATA } from "../actions/types";

const initialState = JSON.parse(localStorage.getItem("selected")) || [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT: {
      const index = state.findIndex(i => i === action.payload.index);
      let newState;
      if (index !== -1) {
        newState = [...state.slice(0, index), ...state.slice(index + 1)];
      } else {
        newState = [...state, action.payload.index];
      }
      localStorage.setItem("selected", JSON.stringify(newState));
      return newState;
    }
    case FETCH_DATA: {
      const newState = [];
      localStorage.setItem("selected", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
