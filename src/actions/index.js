import faker from "faker";
import _ from "lodash";
import {
  FETCH_DATA,
  TOGGLE_SORT,
  SORT_DATA,
  FILTER,
  FETCH_FILTER
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
    description: faker.lorem.text(),
    idNumber: faker.random.number(),
    date: faker.date.recent().setHours(0, 0, 0, 0),
    payment: {
      amount: faker.commerce.price(),
      currency: faker.finance.currencySymbol()
    },
    role: RoleMaker(faker.random.number({ min: 0, max: 2 }))
  };
};

export const loadData = () => async dispatch => {
  const data = [...new Array(100)].map((_, index) => makeFake(index + 1));
  dispatch({ type: FETCH_DATA, payload: data });
};

export const toggleSort = (key = "do") => async (dispatch, getState) => {
  if (key !== "do") {
    dispatch({ type: TOGGLE_SORT, payload: { key } });
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
  console.log([...keys], [...values]);
  dispatch({ type: SORT_DATA, payload: sortedData });
};

export const filtify = (key, filter) => async (dispatch, getState) => {
  dispatch({ type: FILTER, payload: { key, filter } });

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
      payload: { status: true, filteredData: filteredData }
    });
  } else {
    dispatch({
      type: FETCH_FILTER,
      payload: { status: false, filteredData: [] }
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
    case "role":
      return value === filter;
    default:
      return false;
  }
}
