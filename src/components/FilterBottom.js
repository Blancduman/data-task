import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { filtify, toggleSort, virtulized } from "../actions";

import "./FilterBottom.scss";

const FilterBottom = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [roleExpanded, setRoleExpanded] = useState({
    expanded: false,
    display: "none"
  });
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

  const handleRoleExpanding = () => {
    if (!roleExpanded.expanded) {
      setRoleExpanded({ expanded: true, display: "block" });
    } else {
      setRoleExpanded({ expanded: false, display: "none" });
    }
  };
  useEffect(() => {
    let tmpFilters = {};
    for (let tmp of _filter) {
      tmpFilters[tmp.key] = tmp.filter;
      console.log(tmp.key === "role" ? tmp.filter : "");
    }
    setFilters({
      ...tmpFilters
    });
  }, [_filter]);

  const bread = () => {
    const crum = beadcrum.map(i => <li key={i.key}>{i.key}</li>);

    return (
      <ul className="breadcrumb">
        <li>Order fileds queue</li>
        {crum}
      </ul>
    );
  };

  return (
    <>
      <label>
        <span style={{ fontSize: "1.4rem" }}>isActive</span>
        <div style={{ top: 5, display: "inline-block", position: "relative" }}>
          <Switch
            onChange={() =>
              handleFilter("isActive", filters.isActive ? "" : true)
            }
            checked={filters.isActive || false}
          />
          {/* <Checkbox
            checked={filters.isActive || false}
            indeterminate={filters.isActive || ""}
            onChange={() =>
              handleFilter("isActive", filters.isActive ? "" : true)
            }
          /> */}
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
        <div
          className="multiselect filter-bottom--role border height"
          style={{ position: "relative", display: "inline-block" }}
        >
          <div className="selectBox" onClick={handleRoleExpanding}>
            <select style={{ borderRightWidth: 0 }}>
              <option>{`${
                filters.role
                  ? `${filters.role.Student ? "Student;" : ""} 
                      ${filters.role.Activist ? "Activist;" : ""} 
                      ${filters.role.Mentor ? "Mentor;" : ""}`
                  : ""
              }`}</option>
            </select>
            <div className="overSelect"></div>
          </div>
          <div
            id="checkboxes"
            style={{ display: roleExpanded.display, position: "absolute" }}
          >
            <label htmlFor="one">
              <input
                type="checkbox"
                id="one"
                checked={(filters.role ? filters.role.Student : false) || false}
                onChange={e =>
                  handleFilter("role", {
                    ...filters.role,
                    Student: filters.role ? !filters.role.Student : true
                  })
                }
              />
              Student
            </label>
            <label htmlFor="two">
              <input
                type="checkbox"
                id="two"
                checked={
                  (filters.role ? filters.role.Activist : false) || false
                }
                onChange={e =>
                  handleFilter("role", {
                    ...filters.role,
                    Activist: filters.role ? !filters.role.Activist : true
                  })
                }
              />
              Activist
            </label>
            <label htmlFor="three">
              <input
                type="checkbox"
                id="three"
                checked={(filters.role ? filters.role.Mentor : false) || false}
                onChange={e =>
                  handleFilter("role", {
                    ...filters.role,
                    Mentor: filters.role ? !filters.role.Mentor : true
                  })
                }
              />
              Mentor
            </label>
          </div>
        </div>
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
          onChange={e => handleFilter("payment", e.target.value)}
        />
      </div>
    </>
  );
};

export default FilterBottom;
