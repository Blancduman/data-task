import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSort } from "../actions";

import "./Row.scss";
import "./TableHead.scss";

const TableHead = () => {
  const dispatch = useDispatch();
  const tableHeaders = useSelector(state => state.tableHeaders);
  const sorting = ["", "asc", "desc"];
  const toggleClick = key => {
    const direction = sorting.findIndex(s => s === tableHeaders[key]);
    dispatch(toggleSort(key, (direction + 1) % sorting.length));
  };

  return (
    <div className="tableHead">
      <span
        className={`tableHead--rank display-cell-flex border-right sort-by${tableHeaders["rank"]}`}
        onClick={() => toggleClick("rank")}
      >
        #
      </span>
      <span
        className={`tableHead--fullname display-cell-flex border-right sort-by${tableHeaders["fullName"]}`}
        onClick={() => toggleClick("fullName")}
      >
        Fullname
      </span>
      <span
        className={`tableHead--email display-cell-flex border-right sort-by${tableHeaders["email"]}`}
        onClick={() => toggleClick("email")}
      >
        Email
      </span>
      <span
        className={`tableHead--LocationName display-cell-flex border-right  sort-by${tableHeaders["LocationName"]}`}
        onClick={() => toggleClick("LocationName")}
      >
        Location
      </span>
      <span
        className={`tableHead--role display-cell-flex border-right sort-by${tableHeaders["role"]}`}
        onClick={() => toggleClick("role")}
      >
        Role
      </span>
      <span className={`tableHead--phone display-cell-flex border-right`}>
        Phone
      </span>
      <span
        className={`tableHead--date display-cell-flex border-right sort-by${tableHeaders["date"]}`}
        onClick={() => toggleClick("date")}
      >
        Date
      </span>
      <span
        className={`tableHead--payment display-cell-flex border-right sort-by${tableHeaders["payment"]}`}
        onClick={() => toggleClick("payment")}
      >
        Payment
      </span>
    </div>
  );
};

export default TableHead;
