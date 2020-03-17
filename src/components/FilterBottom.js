import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { filtify, toggleSort, virtulized } from "../actions";
import HideFields from "./HideFields";

import "./FilterBottom.scss";

const FilterBottom = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const notHide = useSelector(state => state.hide);
  const [roleExpanded, setRoleExpanded] = useState({
    expanded: false,
    display: "none"
  });
  const beadcrum = useSelector(state => state.tableHeaders);
  const _filter = useSelector(state => state.filter);
  const virtual = useSelector(state => state.virtulized);
  const hide = useSelector(state => state.hide);
  const [width, setWidth] = useState(1337);

  const handleFilter = (key, value) => {
    dispatch(toggleSort());
    dispatch(filtify(key, value));
    // setFilters({
    //   ...filters,
    //   [key]: value
    // });
  };

  useEffect(() => {
    let newWidth = 0;
    for (let h of hide) {
      if (h.status) {
        newWidth += h.width;
      }
    }
    setWidth(newWidth);
  }, [hide]);

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
    }
    setFilters({
      ...tmpFilters
    });
  }, [_filter]);

  const bread = () => {
    const crum = beadcrum.map(i => <li key={i.key}>{i.key}</li>);

    return (
      <ul
        className="breadcrumb text-verflow-ellipsis"
        style={{ width: width - 33 }}
      >
        <li>Order fileds queue</li>
        {crum}
      </ul>
    );
  };

  return (
    <>
      <label style={{ marginLeft: 10 }}>
        <span style={{ fontSize: "1.4rem" }}>Virtulized</span>
        <div style={{ top: 5, display: "inline-block", position: "relative" }}>
          <Switch onChange={() => dispatch(virtulized())} checked={virtual} />
        </div>
      </label>
      <HideFields />
      <div className="filter-bottom">
        {bread()}
        <div>
          {notHide[0].status && (
            <input
              type="number"
              className="filter-bottom--rank border height"
              value={filters.rank || ""}
              min="1"
              onChange={e => handleFilter("rank", Number(e.target.value))}
            />
          )}
          {notHide[1].status && (
            <input
              type="text"
              className="filter-bottom--fullname border height"
              value={filters.fullName || ""}
              onChange={e => handleFilter("fullName", e.target.value)}
            />
          )}
          {notHide[2].status && (
            <input
              type="text"
              className="filter-bottom--email border height"
              value={filters.email || ""}
              onChange={e => handleFilter("email", e.target.value)}
            />
          )}
          {notHide[3].status && (
            <input
              type="text"
              className="filter-bottom--LocationName border height"
              value={filters.LocationName || ""}
              onChange={e => handleFilter("LocationName", e.target.value)}
            />
          )}
          {notHide[4].status && (
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
                    checked={
                      (filters.role ? filters.role.Student : false) || false
                    }
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
                    checked={
                      (filters.role ? filters.role.Mentor : false) || false
                    }
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
          )}
          {notHide[5].status && (
            <input
              type="text"
              className="filter-bottom--phone border height"
              value={filters.phone || ""}
              onChange={e => handleFilter("phone", e.target.value)}
            />
          )}
          {notHide[6].status && (
            <input
              type="date"
              className="filter-bottom--date border height"
              value={filters.date || ""}
              onChange={e => handleFilter("date", e.target.value)}
            />
          )}
          {notHide[7].status && (
            <input
              type="text"
              className="filter-bottom--payment border height"
              value={filters.payment || ""}
              onChange={e => handleFilter("payment", e.target.value)}
            />
          )}
          {notHide[8].status && (
            // <div className="filter-bottom--activity border height">
            //   <Switch
            // onChange={() =>
            //   handleFilter("isActive", filters.isActive ? "" : true)
            // }
            //     checked={filters.isActive || false}
            //   />
            // </div>
            <span className="filter-bottom--activity">
              <input
                type="checkbox"
                checked={filters.isActive || false}
                onChange={() =>
                  handleFilter("isActive", filters.isActive ? "" : true)
                }
              />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterBottom;
