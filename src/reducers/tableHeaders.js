import { TOGGLE_SORT_ON, TOGGLE_SORT, TOGGLE_SORT_OFF } from "../actions/types";

// const initialState = [];
const initialState = [];

const sorting = ["", "asc", "desc"];

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SORT:
      const index = state.findIndex(i => i.key === action.payload.key);
      if (index !== -1) {
        if (
          sorting[
            (sorting.findIndex(i => i === state[index].direction) + 1) %
              sorting.length
          ] === ""
        ) {
          return [...state.slice(0, index), ...state.slice(index + 1)];
        }
        return [
          ...state.slice(0, index),
          {
            key: action.payload.key,
            direction:
              sorting[
                (sorting.findIndex(i => i === state[index].direction) + 1) %
                  sorting.length
              ]
          },
          ...state.slice(index + 1)
        ];
      }
      return [
        ...state,
        {
          key: action.payload.key,
          direction: sorting[1]
        }
      ];
    default:
      return state;
  }
};
