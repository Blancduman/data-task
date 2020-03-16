import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Switch from "react-switch";
import { hide } from "../actions";

import "./HideFields.scss";

const HideFields = () => {
  const allHeaders = useSelector(state => state.hide);
  const dispatch = useDispatch();
  const headers = allHeaders.map(h => {
    if (h.key !== "id")
      return (
        <label key={h.key} style={{ marginLeft: 10 }}>
          <span style={{ fontSize: "1.4rem" }}>{h.key} </span>
          <div
            style={{ top: 5, display: "inline-block", position: "relative" }}
          >
            <Switch onChange={() => dispatch(hide(h.key))} checked={h.status} />
          </div>
        </label>
      );
  });

  return <div>{headers}</div>;
};

export default HideFields;
