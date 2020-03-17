import faker from "faker";
import _ from "lodash";
import {
  FETCH_DATA,
  TOGGLE_SORT,
  SORT_DATA,
  FILTER,
  FETCH_FILTER,
  VIRTULIZED,
  SELECT,
  HIDE,
  DELETE,
  TOGGLE_SORT_SOLO,
  SELECT_SOLO
} from "./types";
faker.seed(783);

function RoleMaker(number) {
  if (number === 0) return "Activist";
  if (number === 1) return "Student";
  if (number === 2) return "Mentor";
}

const makeFake = index => {
  return {
    id: 11 + index,
    rank: index,
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    LocationName: faker.address.city(),
    isActive: faker.random.boolean(),
    phone: faker.phone.phoneNumberFormat(),
    date: faker.date.recent().setHours(0, 0, 0, 0),
    payment: {
      amount: faker.commerce.price(),
      currency: faker.finance.currencySymbol()
    },
    role: RoleMaker(faker.random.number({ min: 0, max: 2 }))
  };
};

export const loadData = () => async dispatch => {
  const data = [...new Array(1000)].map((_, index) => makeFake(index + 1));
  dispatch({ type: FETCH_DATA, payload: data });
};

export const toggleSort = (key = "do", solo = false) => async (
  dispatch,
  getState
) => {
  if (key !== "do") {
    if (solo) {
      dispatch({ type: TOGGLE_SORT, payload: { key } });
    } else {
      dispatch({ type: TOGGLE_SORT_SOLO, payload: { key } });
    }
  }
  const headers = getState().tableHeaders;

  const keys = [];
  const values = [];

  for (let header of headers) {
    if (header.key === "payment") {
      keys.push(function(item) {
        return _.chain(item)
          .get(header.key)
          .get("amount")
          .value();
      });
    } else {
      keys.push(header.key);
    }
    values.push(header.direction);
  }
  const unSortedData = getState().data.isFiltered
    ? getState().data.filteredData
    : getState().data.data;
  const sortedData = _.orderBy(unSortedData, [...keys], [...values]);
  dispatch({ type: SORT_DATA, payload: sortedData });
};

export const filtify = (key = "do", filter) => async (dispatch, getState) => {
  if (key !== "do") {
    dispatch({ type: FILTER, payload: { key, filter } });
  }
  if (key === "role") {
    let tmp = {};
    for (let r in filter) {
      if (filter[r]) tmp[r] = filter[r];
    }
    dispatch({
      type: FILTER,
      payload: { key, filter: _.isEmpty(tmp) ? "" : tmp }
    });
  }

  const unFilteredData = getState().data.data;
  const triggers = getState().filter;
  if (triggers.length !== 0) {
    const filteredData = unFilteredData.filter(d => {
      let flag = 0;
      for (let t of triggers) {
        if (omgFilter(t, d[t.key])) {
          flag += 1;
        }
      }
      return flag === triggers.length;
    });
    dispatch({
      type: FETCH_FILTER,
      payload: { filteredData: filteredData }
    });
  } else {
    dispatch({
      type: FETCH_FILTER,
      payload: { filteredData: unFilteredData }
    });
  }
};

function omgFilter({ key, filter }, value) {
  switch (key) {
    case "rank":
      return value === filter;
    case "fullName":
      return value.toLowerCase().includes(filter.toLowerCase());
    case "email":
      return value.toLowerCase().includes(filter.toLowerCase());
    case "LocationName":
      return value.toLowerCase().includes(filter.toLowerCase());
    case "isActive":
      return value === true;
    case "phone":
      return value.toLowerCase().includes(filter.toLowerCase());
    case "date":
      return value === new Date(filter).setHours(0, 0, 0, 0);
    case "role": {
      for (let role in filter) {
        if (value === role) {
          return true;
        }
      }
      return false;
    }
    case "payment":
      return `${value.currency} ${value.amount}`
        .toLowerCase()
        .includes(filter.toLowerCase());
    default:
      return false;
  }
}

export const virtulized = () => async dispatch => {
  dispatch({ type: VIRTULIZED });
};

export const selecting = (index, shift) => async dispatch => {
  if (shift) {
    dispatch({ type: SELECT, payload: { index: index } });
  } else {
    dispatch({ type: SELECT_SOLO, payload: { index: index } });
  }
};

export const hide = key => async dispatch => {
  dispatch({ type: HIDE, payload: { key: key } });
};
export const deleteSelected = () => (dispatch, getState) => {
  dispatch({ type: DELETE, payload: getState().selected });
};

export const exportCSV = (selectedOnly = false) => (dispatch, getState) => {
  const headers = getState().hide.reduce((result, i) => {
    if (i.key === "id") {
      return { ...result, [i.key]: "id" };
    }
    if (i.status) {
      switch (i.key) {
        case "rank":
          return { ...result, [i.key]: "Rank" };
        case "fullName":
          return { ...result, [i.key]: "FullName" };
        case "email":
          return { ...result, [i.key]: "Email" };
        case "LocationName":
          return { ...result, [i.key]: "Location" };
        case "phone":
          return { ...result, [i.key]: "Phone" };
        case "date":
          return { ...result, [i.key]: "Date" };
        case "payment":
          return { ...result, [i.key]: "Payment" };
        case "role":
          return { ...result, [i.key]: "Role" };
        case "isActive":
          return { ...result, [i.key]: "isActive" };
        default:
          break;
      }
    }
    return result;
  }, {});
  let data;
  if (selectedOnly) {
    const filters = getState().selected;
    data = getState().data.showData.reduce((result, i) => {
      if (filters.indexOf(i.id) !== -1) {
        const tmp = { ...i };
        tmp.payment = `${tmp.payment.currency} ${tmp.payment.amount}`;
        tmp.date = new Date(tmp.date).toLocaleDateString(navigator.language);
        return [...result, _.pick(tmp, _.keys(headers))];
      }
      return result;
    }, []);
  } else {
    data = getState().data.showData.map(i => {
      const tmp = { ...i };
      tmp.payment = `${tmp.payment.currency} ${tmp.payment.amount}`;
      tmp.date = new Date(tmp.date).toLocaleDateString(navigator.language);
      return _.pick(tmp, _.keys(headers));
    });
  }

  data.unshift(headers);

  const jsonObject = JSON.stringify(data);

  const csv = convertToCSV(jsonObject);
  const exportedFilename = "For real_questionmark.csv";

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", exportedFilename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function convertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}
