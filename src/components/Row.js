import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./Row.scss";
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
const Row = ({ index, style }) => {
  const {
    rank,
    fullName,
    email,
    LocationName,
    phone,
    date,
    role,
    payment
  } = useSelector(state => state.data.showData[index]);
  const tableHeaders = useSelector(state => state.tableHeaders);
  const [headers, setHeaders] = useState({});
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
    <div style={{ ...style }} className="tableRow">
      <span
        className={`tableRow--rank display-cell-flex text-verflow-ellipsis border-right border-left ${
          headers["rank"] ? headers["rank"] + " sorted-row" : ""
        }`}
      >
        {rank}
      </span>
      <span
        className={`tableRow--fullname display-cell-flex text-verflow-ellipsis border-right tableRow--item-left ${
          headers["fullName"] ? headers["fullName"] + " sorted-row" : ""
        }`}
      >
        {fullName}
      </span>
      <span
        className={`tableRow--email display-cell-flex text-verflow-ellipsis border-right tableRow--item-left ${
          headers["email"] ? headers["email"] + " sorted-row" : ""
        }`}
      >
        {email}
      </span>
      <span
        className={`tableRow--LocationName display-cell-flex text-verflow-ellipsis border-right tableRow--item-left ${
          headers["LocationName"] ? headers["LocationName"] + " sorted-row" : ""
        }`}
      >
        {LocationName}
      </span>
      <span
        className={`tableRow--phone display-cell-flex text-verflow-ellipsis border-right ${
          headers["role"] ? headers["role"] + " sorted-row" : ""
        }`}
      >
        {role}
      </span>
      <span
        className={`tableRow--phone display-cell-flex text-verflow-ellipsis border-right ${
          headers["phone"] ? headers["phone"] + " sorted-row" : ""
        }`}
      >
        {phone}
      </span>
      <span
        className={`tableRow--date display-cell-flex text-verflow-ellipsis border-right ${
          headers["date"] ? headers["date"] + " sorted-row" : ""
        }`}
      >
        {new Date(date).toLocaleDateString(`${navigator.language}`)}
      </span>
      <span
        className={`tableRow--payment display-cell-flex text-verflow-ellipsis border-right tableRow--item-right ${
          headers["payment"] ? headers["payment"] + " sorted-row" : ""
        }`}
      >
        {`${payment.currency} ${payment.amount}`}
      </span>
    </div>
  );
};

export default Row;
