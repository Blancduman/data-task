import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selecting } from "../actions";
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
export const Row = ({ index, style }) => {
  const {
    id,
    rank,
    fullName,
    email,
    LocationName,
    phone,
    date,
    role,
    payment
  } = useSelector(state => state.data.showData[index]);
  const selected = useSelector(state => state.selected);
  const hide = useSelector(state => state.hide);
  const tableHeaders = useSelector(state => state.tableHeaders);
  const [headers, setHeaders] = useState({});
  const dispatch = useDispatch();
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

  const handleSelect = _index => {
    dispatch(selecting(_index));
  };

  return (
    <div
      key={id}
      style={{ ...style }}
      className={`tableRow${
        selected.findIndex(i => i === index) !== -1 ? " selected" : ""
      }`}
      onClick={() => handleSelect(index)}
    >
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
