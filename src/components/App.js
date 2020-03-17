import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList } from "react-window";
import { loadData } from "../actions/index";
import { Row } from "./Row";
import TableHead from "./TableHead";
import FilterBottom from "./FilterBottom";
import ButtonsSelected from "./ButtonsSelected";

import "./App.css";

// const columnWidths = [50, 200, 270, 150, 120, 100, 100, 100];

function App(props) {
  const data = useSelector(state => state.data.showData);
  const isLoaded = useSelector(state => state.data.data).length !== 0;
  const virtual = useSelector(state => state.virtulized);
  const hide = useSelector(state => state.hide);
  const [width, setWidth] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) dispatch(loadData());
  }, [isLoaded, dispatch]);

  useEffect(() => {
    let newWidth = 0;
    for (let h of hide) {
      if (h.status) {
        newWidth += h.width;
      }
    }
    setWidth(newWidth);
  }, [hide]);

  if (virtual)
    return (
      <div className="App" style={{ marginLeft: 25 }}>
        <FilterBottom />
        <TableHead />
        <FixedSizeList
          height={data.length > 13 ? 600 : data.length * 45 + 1}
          itemCount={data.length}
          itemSize={45}
          width={width}
          style={{
            overflowX: "hidden",
            borderBottom: "1px solid #ddd",
            overflowY: "scroll"
          }}
        >
          {Row}
        </FixedSizeList>
        <ButtonsSelected />
      </div>
    );

  return (
    <div className="App" style={{ marginLeft: 25 }}>
      <FilterBottom />
      <TableHead />
      <Dasasd data={data} />
      <ButtonsSelected />
    </div>
  );
}

export default App;

const Dasasd = () => {
  const data = useSelector(state => state.data.showData);
  const hide = useSelector(state => state.hide);
  const [width, setWidth] = useState();
  useEffect(() => {
    let newWidth = 0;
    for (let h of hide) {
      if (h.status) {
        newWidth += h.width;
      }
    }
    setWidth(newWidth);
  }, [hide]);
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
        height: data.length > 13 ? 600 : data.length * 45 + 1,
        width: width
      }}
    >
      {as}
    </div>
  );
};
