import faker from "faker";
import _ from "lodash";
import { FETCH_DATA, TOGGLE_SORT, SORT_DATA } from "./types";
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
    date: faker.date.recent(),
    payment: {
      amount: faker.commerce.price(),
      currency: faker.finance.currencySymbol()
    },
    role: RoleMaker(faker.random.number({ min: 0, max: 2 }))
  };
};

export const loadData = () => async dispatch => {
  const data = [...new Array(100)].map((_, index) => makeFake(index));
  dispatch({ type: FETCH_DATA, payload: data });
};

export const toggleSort = key => async (dispatch, getState) => {
  dispatch({ type: TOGGLE_SORT, payload: { key } });
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
  const unsortedData = getState().data.data;
  console.log([...keys], [...values]);
  const sortedData = _.orderBy(unsortedData, [...keys], [...values]);
  dispatch({ type: SORT_DATA, payload: sortedData });
};
