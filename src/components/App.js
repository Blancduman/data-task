import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList } from "react-window";
import { loadData } from "../actions/index";
import Row from "./Row";
import TableHead from "./TableHead";

import "./App.css";

// const columnWidths = [50, 200, 270, 150, 120, 100, 100, 100];

function App(props) {
  const { data } = useSelector(state => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data.length)
    return (
      <div className="App" style={{ marginLeft: 25 }}>
        <TableHead />
        <FixedSizeList
          height={800}
          itemCount={data.length}
          itemSize={45}
          width={1538}
          style={{ overflowX: "hidden", borderBottom: "1px solid #ddd" }}
        >
          {Row}
        </FixedSizeList>
      </div>
    );
  return <div>APp</div>;
}

export default App;
