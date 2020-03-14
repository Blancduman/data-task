import React from "react";
import { useSelector } from "react-redux";

import "./Row.scss";

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
  } = useSelector(state => state.data.sorted[index]);
  return (
    <div style={{ ...style }} className="tableRow">
      <span className="tableRow--rank display-cell-flex text-verflow-ellipsis border-right border-left">
        {rank}
      </span>
      <span className="tableRow--fullname display-cell-flex text-verflow-ellipsis border-right tableRow--item-left">
        {fullName}
      </span>
      <span className="tableRow--email display-cell-flex text-verflow-ellipsis border-right tableRow--item-left">
        {email}
      </span>
      <span className="tableRow--LocationName display-cell-flex text-verflow-ellipsis border-right tableRow--item-left">
        {LocationName}
      </span>
      <span className="tableRow--phone display-cell-flex text-verflow-ellipsis border-right">
        {role}
      </span>
      <span className="tableRow--phone display-cell-flex text-verflow-ellipsis border-right">
        {phone}
      </span>
      <span className="tableRow--date display-cell-flex text-verflow-ellipsis border-right">
        {date.toLocaleDateString(`${navigator.language}`)}
      </span>
      <span className="tableRow--payment display-cell-flex text-verflow-ellipsis border-right tableRow--item-right">
        {`${payment.currency} ${payment.amount}`}
      </span>
    </div>
  );
};

export default Row;
