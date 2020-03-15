import { combineReducers } from "redux";
import dataReducer from "./data";
import tableHeadersReducer from "./tableHeaders";
import filterReducer from "./filter";

export default combineReducers({
  data: dataReducer,
  filter: filterReducer,
  tableHeaders: tableHeadersReducer
});
