import { combineReducers } from "redux";
import dataReducer from "./data";
import tableHeadersReducer from "./tableHeaders";

export default combineReducers({
  data: dataReducer,
  tableHeaders: tableHeadersReducer
});
