import { combineReducers } from "redux";
import dataReducer from "./data";
import tableHeadersReducer from "./tableHeaders";
import filterReducer from "./filter";
import virtulizedReducer from "./virtulized";

export default combineReducers({
  data: dataReducer,
  filter: filterReducer,
  virtulized: virtulizedReducer,
  tableHeaders: tableHeadersReducer
});
