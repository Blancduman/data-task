import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hide } from "../actions";

const HideFields = () => {
  const allHeaders = useSelector(state => state.hide);
  const dispatch = useDispatch();
  const headers = allHeaders.map(h => {
    return (
      <label htmlFor={h.key + h.status} key={h.key + h.status}>
        {h.key}{" "}
        <input
          type="checkbox"
          checked={h.status}
          onChange={() => dispatch(hide(h.key))}
        />
      </label>
    );
  });

  return <div>{headers}</div>;
};

export default HideFields;
