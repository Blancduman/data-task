import { FILTER } from "../actions/types";

// const initialState = [];
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER:
      const index = state.findIndex(i => i.key === action.payload.key);

      if (index !== -1) {
        if (action.payload.filter === "" || action.payload.filter === 0) {
          return [...state.slice(0, index), ...state.slice(index + 1)];
        }
        return [
          ...state.slice(0, index),
          { key: action.payload.key, filter: action.payload.filter },
          ...state.slice(index + 1)
        ];
      }
      if (action.payload.filter === "" || action.payload.filter === 0) {
        return state;
      }
      return [
        ...state,
        {
          key: action.payload.key,
          filter: action.payload.filter
        }
      ];
    default:
      return state;
  }
};
