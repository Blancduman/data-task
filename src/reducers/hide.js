import { HIDE } from "../actions/types";

const defaultState = [
  { key: "rank", status: true, width: 92 },
  { key: "fullName", status: true, width: 251 },
  { key: "email", status: true, width: 291 },
  { key: "LocationName", status: true, width: 211 },
  { key: "role", status: true, width: 101 },
  { key: "phone", status: true, width: 151 },
  { key: "date", status: true, width: 131 },
  { key: "payment", status: true, width: 141 }
];

const initialState = JSON.parse(localStorage.getItem("hide")) || defaultState;

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDE: {
      const index = state.findIndex(i => i.key === action.payload.key);
      const newState = [
        ...state.slice(0, index),
        {
          key: action.payload.key,
          status: !state[index].status,
          width: state[index].width
        },
        ...state.slice(index + 1)
      ];

      localStorage.setItem("hide", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
