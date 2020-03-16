import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadData, exportCSV, deleteSelected } from "../actions";

import "./ButtonsSelected.scss";

const ButtonsSelected = () => {
  const selected = useSelector(state => state.selected);
  const hide = useSelector(state => state.hide);
  const dispatch = useDispatch();
  const [width, setWidth] = useState();
  useEffect(() => {
    let newWidth = 0;
    for (let h of hide) {
      if (h.status) {
        newWidth += h.width;
      }
    }
    console.log(newWidth);
    setWidth(newWidth);
  }, [hide]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: width
      }}
    >
      <span style={{ fontSize: "1.6rem" }}>Selected: {selected.length}</span>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <li style={{ display: "inline-block" }}>
          <svg
            className="svg-icon"
            viewBox="0 0 20 20"
            onClick={() => dispatch(loadData())}
          >
            <path
              fill="none"
              d="M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z"
            ></path>
          </svg>
        </li>
        <li style={{ display: "inline-block" }}>
          <svg
            className="svg-icon"
            viewBox="0 0 20 20"
            onClick={() => dispatch(deleteSelected())}
          >
            <path
              fill="none"
              d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
            ></path>
          </svg>
        </li>
        <li style={{ display: "inline-block" }}>
          <svg
            className="svg-icon"
            viewBox="0 0 20 20"
            onClick={() => dispatch(exportCSV())}
          >
            <path
              fill="none"
              d="M9.634,10.633c0.116,0.113,0.265,0.168,0.414,0.168c0.153,0,0.308-0.06,0.422-0.177l4.015-4.111c0.229-0.235,0.225-0.608-0.009-0.836c-0.232-0.229-0.606-0.222-0.836,0.009l-3.604,3.689L6.35,5.772C6.115,5.543,5.744,5.55,5.514,5.781C5.285,6.015,5.29,6.39,5.522,6.617L9.634,10.633z"
            ></path>
            <path
              fill="none"
              d="M17.737,9.815c-0.327,0-0.592,0.265-0.592,0.591v2.903H2.855v-2.903c0-0.327-0.264-0.591-0.591-0.591c-0.327,0-0.591,0.265-0.591,0.591V13.9c0,0.328,0.264,0.592,0.591,0.592h15.473c0.327,0,0.591-0.264,0.591-0.592v-3.494C18.328,10.08,18.064,9.815,17.737,9.815z"
            ></path>
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default ButtonsSelected;
