import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSort } from "../actions";

import "./Row.scss";
import "./TableHead.scss";

const defaultHeaders = {
  rank: "",
  fullName: "",
  email: "",
  LocationName: "",
  phone: "",
  date: "",
  payment: "",
  role: ""
};

const TableHead = () => {
  const dispatch = useDispatch();
  const tableHeaders = useSelector(state => state.tableHeaders);
  const [headers, setHeaders] = useState({});

  const toggleClick = key => {
    dispatch(toggleSort(key));
  };

  useEffect(() => {
    let tmpHeaders = {};
    for (let head of tableHeaders) {
      tmpHeaders[head.key] = head.direction;
    }
    setHeaders({
      ...defaultHeaders,
      ...tmpHeaders
    });
  }, [tableHeaders]);

  return (
    <div className="tableHead">
      <span
        className={`tableHead--rank border-left display-cell-flex border-right sort-by${
          headers["rank"] ? headers["rank"] + " sorted" : ""
        }`}
        onClick={() => toggleClick("rank")}
      >
        #
      </span>
      <span
        className={`tableHead--fullname display-cell-flex border-right sort-by${
          headers["fullName"] ? headers["fullName"] + " sorted" : ""
        }`}
        onClick={() => toggleClick("fullName")}
      >
        Fullname
      </span>
      <span
        className={`tableHead--email display-cell-flex border-right sort-by${
          headers["email"] ? headers["email"] + " sorted" : ""
        }`}
        onClick={() => toggleClick("email")}
      >
        Email
      </span>
      <span
        className={`tableHead--LocationName display-cell-flex border-right  sort-by${
          headers["LocationName"] ? headers["LocationName"] + " sorted" : ""
        }`}
        onClick={() => toggleClick("LocationName")}
      >
        Location
      </span>
      <span
        className={`tableHead--role display-cell-flex border-right sort-by${
          headers["role"] ? headers["role"] + " sorted" : ""
        }`}
        onClick={() => toggleClick("role")}
      >
        Role
      </span>
      <span className={`tableHead--phone display-cell-flex border-right`}>
        Phone
      </span>
      <span
        className={`tableHead--date display-cell-flex border-right sort-by${
          headers["date"] ? headers["date"] + " sorted" : ""
        }`}
        onClick={() => toggleClick("date")}
      >
        Date
      </span>
      <span
        className={`tableHead--payment display-cell-flex border-right sort-by${
          headers["payment"] ? headers["payment"] + " sorted" : ""
        }`}
        onClick={() => toggleClick("payment")}
      >
        Payment
      </span>
    </div>
  );
};

export default TableHead;
