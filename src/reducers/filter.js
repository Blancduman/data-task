import { FILTER } from "../actions/types";

// const initialState = [];
const initialState = JSON.parse(localStorage.getItem("filter")) || [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      const index = state.findIndex(i => i.key === action.payload.key);

      if (index !== -1) {
        if (action.payload.filter === "" || action.payload.filter === 0) {
          const newState = [
            ...state.slice(0, index),
            ...state.slice(index + 1)
          ];
          localStorage.setItem("filter", JSON.stringify(newState));
          return newState;
        }
        const newState = [
          ...state.slice(0, index),
          { key: action.payload.key, filter: action.payload.filter },
          ...state.slice(index + 1)
        ];
        localStorage.setItem("filter", JSON.stringify(newState));
        return newState;
      }
      if (action.payload.filter === "" || action.payload.filter === 0) {
        return state;
      }
      const newState = [
        ...state,
        {
          key: action.payload.key,
          filter: action.payload.filter
        }
      ];
      localStorage.setItem("filter", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};
