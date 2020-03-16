import { TOGGLE_SORT } from "../actions/types";

// const initialState = [];
const initialState = JSON.parse(localStorage.getItem("tableHeaders")) || [];

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
          const newState = [
            ...state.slice(0, index),
            ...state.slice(index + 1)
          ];
          localStorage.setItem("tableHeaders", JSON.stringify(newState));
          return newState;
        }
        const newState = [
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
        localStorage.setItem("tableHeaders", JSON.stringify(newState));
        return newState;
      }
      const newState = [
        ...state,
        {
          key: action.payload.key,
          direction: sorting[1]
        }
      ];
      localStorage.setItem("tableHeaders", JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};
