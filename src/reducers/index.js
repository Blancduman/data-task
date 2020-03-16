import { combineReducers } from "redux";
import dataReducer from "./data";
import tableHeadersReducer from "./tableHeaders";
import filterReducer from "./filter";
import virtulizedReducer from "./virtulized";
import selectedReducer from "./selected";

export default combineReducers({
  data: dataReducer,
  filter: filterReducer,
  virtulized: virtulizedReducer,
  tableHeaders: tableHeadersReducer,
  selected: selectedReducer
});
