import { TOGGLE_SORT } from "../actions/types";

const initialState = {
  rank: "",
  fullName: "",
  email: "",
  LocationName: "",
  phone: "",
  date: "",
  payment: "",
  role: ""
};

const sorting = ["", "asc", "desc"];

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SORT:
      return {
        ...state,
        [action.payload.key]: sorting[action.payload.direction]
      };
    default:
      return state;
  }
};
