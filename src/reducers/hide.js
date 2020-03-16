import { HIDE } from "../actions/types";

const defaultState = [
  { key: "key", status: true },
  { key: "fullName", status: true },
  { key: "email", status: true },
  { key: "LocationName", status: true },
  { key: "role", status: true },
  { key: "phone", status: true },
  { key: "date", status: true },
  { key: "payment", status: true }
];

const initialState = JSON.parse(localStorage.getItem("hide")) || defaultState;

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDE: {
      const index = state.findIndex(i => i.key === action.payload.key);
      const newState = [
        ...state.slice(0, index),
        { key: action.payload.key, status: !state[index].status },
        ...state.slice(index + 1)
      ];

      localStorage.setItem("hide", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
