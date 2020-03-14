import React from "react";

import "./Row.scss";
import "./TableHead.scss";

const TableHead = () => {
  return (
    <div className="tableHead">
      <span className="tableHead--rank display-cell-flex border-right sort-by">
        #
      </span>
      <span className="tableHead--fullname display-cell-flex border-right sort-by">
        Fullname
      </span>
      <span className="tableHead--email display-cell-flex border-right sort-by">
        Email
      </span>
      <span className="tableHead--LocationName display-cell-flex border-right  sort-by">
        Location
      </span>
      <span className="tableHead--phone display-cell-flex border-right">
        Phone
      </span>
      <span className="tableHead--date display-cell-flex border-right sort-by">
        Date
      </span>
      <span className="tableHead--payment display-cell-flex border-right sort-by">
        Payment
      </span>
    </div>
  );
};

export default TableHead;
