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
  const notHide = useSelector(state => state.hide);
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
      {notHide[0].status && (
        <span
          className={`tableHead--rank border-left display-cell-flex border-right sort-by${
            headers["rank"] ? headers["rank"] + " sorted" : ""
          }`}
          onClick={() => toggleClick("rank")}
        >
          #
        </span>
      )}
      {notHide[1].status && (
        <span
          className={`tableHead--fullname display-cell-flex border-right sort-by${
            headers["fullName"] ? headers["fullName"] + " sorted" : ""
          }`}
          onClick={() => toggleClick("fullName")}
        >
          Fullname
        </span>
      )}
      {notHide[2].status && (
        <span
          className={`tableHead--email display-cell-flex border-right sort-by${
            headers["email"] ? headers["email"] + " sorted" : ""
          }`}
          onClick={() => toggleClick("email")}
        >
          Email
        </span>
      )}
      {notHide[3].status && (
        <span
          className={`tableHead--LocationName display-cell-flex border-right  sort-by${
            headers["LocationName"] ? headers["LocationName"] + " sorted" : ""
          }`}
          onClick={() => toggleClick("LocationName")}
        >
          Location
        </span>
      )}
      {notHide[4].status && (
        <span
          className={`tableHead--role display-cell-flex border-right sort-by${
            headers["role"] ? headers["role"] + " sorted" : ""
          }`}
          onClick={() => toggleClick("role")}
        >
          Role
        </span>
      )}
      {notHide[5].status && (
        <span className={`tableHead--phone display-cell-flex border-right`}>
          Phone
        </span>
      )}
      {notHide[6].status && (
        <span
          className={`tableHead--date display-cell-flex border-right sort-by${
            headers["date"] ? headers["date"] + " sorted" : ""
          }`}
          onClick={() => toggleClick("date")}
        >
          Date
        </span>
      )}
      {notHide[7].status && (
        <span
          className={`tableHead--payment display-cell-flex border-right sort-by${
            headers["payment"] ? headers["payment"] + " sorted" : ""
          }`}
          onClick={() => toggleClick("payment")}
        >
          Payment
        </span>
      )}
    </div>
  );
};

export default TableHead;
