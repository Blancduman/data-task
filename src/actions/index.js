import { FETCH_DATA } from "./types";
import faker from "faker";
faker.seed(783);

const makeFake = index => {
  return {
    id: 11 + index,
    rank: index,
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
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
    }
  };
};

export const loadData = () => async dispatch => {
  const data = [...new Array(100)].map((_, index) => makeFake(index));
  dispatch({ type: FETCH_DATA, payload: data });
};
let sto = 100;
export const minus1 = () => async (dispatch, getState) => {
  const data = [...new Array(sto--)].map((_, index) => makeFake(index));
  dispatch({ type: "minus1", payload: data });
};
