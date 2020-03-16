import { VIRTULIZED } from "../actions/types";

const item = localStorage.getItem("virtulized");
console.log(item);

const initialState = item !== null ? (item === "true" ? true : false) : true;

export default (state = initialState, action) => {
  switch (action.type) {
    case VIRTULIZED:
      localStorage.setItem("virtulized", JSON.stringify(!state));
      return !state;
    default:
      return state;
  }
};
