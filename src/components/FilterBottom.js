import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import Select from "react-select";
import { filtify, toggleSort, virtulized } from "../actions";

import "./FilterBottom.scss";

const FilterBottom = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const beadcrum = useSelector(state => state.tableHeaders);
  const _filter = useSelector(state => state.filter);
  const virtual = useSelector(state => state.virtulized);

  const handleFilter = (key, value) => {
    dispatch(filtify(key, value));
    dispatch(toggleSort());
    // setFilters({
    //   ...filters,
    //   [key]: value
    // });
  };

  useEffect(() => {
    let tmpFilters = {};
    for (let tmp of _filter) {
      tmpFilters[tmp.key] = tmp.filter;
    }
    setFilters({
      ...tmpFilters
    });
  }, [_filter]);

  const bread = () => {
    const crum = beadcrum.map(i => <li key={i.key}>{i.key}</li>);

    return <ul className="breadcrumb">{crum}</ul>;
  };

  return (
    <>
      <label>
        <span style={{ fontSize: "1.4rem" }}>isActive</span>
        <div style={{ top: 5, display: "inline-block", position: "relative" }}>
          <Switch
            onChange={() =>
              handleFilter("isActive", filters.isActive ? false : true)
            }
            checked={filters.isActive || false}
          />
        </div>
      </label>
      <label style={{ marginLeft: 10 }}>
        <span style={{ fontSize: "1.4rem" }}>Virtulized</span>
        <div style={{ top: 5, display: "inline-block", position: "relative" }}>
          <Switch onChange={() => dispatch(virtulized())} checked={virtual} />
        </div>
      </label>
      <div className="filter-bottom">
        {bread()}
        <input
          type="number"
          className="filter-bottom--rank border height"
          value={filters.rank || ""}
          min="1"
          onChange={e => handleFilter("rank", Number(e.target.value))}
        />
        <input
          type="text"
          className="filter-bottom--fullname border height"
          value={filters.fullName || ""}
          onChange={e => handleFilter("fullName", e.target.value)}
        />
        <input
          type="text"
          className="filter-bottom--email border height"
          value={filters.email || ""}
          onChange={e => handleFilter("email", e.target.value)}
        />
        <input
          type="text"
          className="filter-bottom--LocationName border height"
          value={filters.LocationName || ""}
          onChange={e => handleFilter("LocationName", e.target.value)}
        />
        <Select
          className="filter-bottom--role border height"
          menuPlacement="bottom"
          value={
            filters.role === ""
              ? { value: "", label: "..." }
              : { value: filters.role, label: filters.role }
          }
          onChange={selectedOpt => handleFilter("role", selectedOpt.value)}
          options={[
            { value: "", label: "..." },
            { value: "Student", label: "Student" },
            { value: "Activist", label: "Activist" },
            { value: "Mentor", label: "Mentor" }
          ]}
        />
        {/* <select
          className="filter-bottom--role border height"
          value={filters.role}
          multiple
          onChange={e => handleFilter("role", e.target.value)}
        > 
          <option value=""></option>
          <option value="Student">Student</option>
          <option value="Activist">Activist</option>
          <option value="Mentor">Mentor</option>
        </select>*/}
        <input
          type="text"
          className="filter-bottom--phone border height"
          value={filters.phone || ""}
          onChange={e => handleFilter("phone", e.target.value)}
        />
        <input
          type="date"
          className="filter-bottom--date border height"
          value={filters.date || ""}
          onChange={e => handleFilter("date", e.target.value)}
        />
        <input
          type="text"
          className="filter-bottom--payment border height"
          value={filters.payment || ""}
          onChange={e => handleFilter("payment", Number(e.target.value))}
        />
      </div>
    </>
  );
};

export default FilterBottom;
