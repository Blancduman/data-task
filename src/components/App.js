import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList } from "react-window";
import { loadData } from "../actions/index";
import { Row } from "./Row";
import TableHead from "./TableHead";
import FilterBottom from "./FilterBottom";
import HideFields from "./HideFields";

import "./App.css";

// const columnWidths = [50, 200, 270, 150, 120, 100, 100, 100];

function App(props) {
  const data = useSelector(state => state.data.showData);
  const isLoaded = useSelector(state => state.data.data).length !== 0;
  const virtual = useSelector(state => state.virtulized);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) dispatch(loadData());
    // dispatch(filtify());
    // dispatch(toggleSort());
  }, [isLoaded, dispatch]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  if (virtual)
    return (
      <div className="App" style={{ marginLeft: 25 }}>
        <FilterBottom />
        <TableHead />
        <FixedSizeList
          height={data.length > 15 ? 700 : data.length * 45 + 1}
          itemCount={data.length}
          itemSize={45}
          width={1538}
          style={{
            overflowX: "hidden",
            borderBottom: "1px solid #ddd",
            overflowY: "scroll"
          }}
        >
          {Row}
        </FixedSizeList>
        <HideFields />
      </div>
    );

  return (
    <div className="App" style={{ marginLeft: 25 }}>
      <FilterBottom />
      <TableHead />
      <Dasasd data={data} />
      <HideFields />
    </div>
  );
}

export default App;

const Dasasd = () => {
  const data = useSelector(state => state.data.showData);
  let counter = 0;
  const as = data.map((i, index) => {
    return <Row key={counter++} index={index} style={{ height: 44 }} />;
  });

  return (
    <div
      style={{
        overflowX: "hidden",
        borderBottom: "1px solid #ddd",
        overflowY: "scroll",
        height: 700,
        width: 1538
      }}
    >
      {as}
    </div>
  );
};
