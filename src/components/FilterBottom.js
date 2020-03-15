import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { filtify, toggleSort } from "../actions";

import "./FilterBottom.scss";

const FilterBottom = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});

  const handleFilter = (key, value) => {
    dispatch(filtify(key, value));
    dispatch(toggleSort());
    setFilters({
      ...filters,
      [key]: value
    });
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div className="filter-bottom">
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
  );
};

export default FilterBottom;
