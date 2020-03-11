import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../actions/index";
import "./App.css";

function App(props) {
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div className="App">Hello</div>;
}

export default App;
