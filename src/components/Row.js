import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selecting } from "../actions";
import "./Row.scss";
// const defaultHeaders = {
//   rank: "",
//   fullName: "",
//   email: "",
//   LocationName: "",
//   phone: "",
//   date: "",
//   payment: "",
//   role: ""
// };
export const Row = ({ index, style }) => {
  const {
    id,
    rank,
    fullName,
    email,
    LocationName,
    phone,
    date,
    role,
    payment,
    isActive
  } = useSelector(state => state.data.showData[index]);
  const selected = useSelector(state => state.selected);
  const notHide = useSelector(state => state.hide);
  // const hide = useSelector(state => state.hide);
  // const tableHeaders = useSelector(state => state.tableHeaders);
  // const [headers, setHeaders] = useState({});
  const dispatch = useDispatch();
  // useEffect(() => {
  //   let tmpHeaders = {};
  //   for (let head of tableHeaders) {
  //     tmpHeaders[head.key] = head.direction;
  //   }
  //   setHeaders({
  //     ...defaultHeaders,
  //     ...tmpHeaders
  //   });
  // }, [tableHeaders]);

  const handleSelect = _index => {
    dispatch(selecting(_index));
  };

  return (
    <div
      key={id}
      style={{ ...style }}
      className={`tableRow${
        selected.findIndex(i => i === id) !== -1 ? " selected" : ""
      }`}
      onClick={() => handleSelect(id)}
    >
      {notHide[0].status && (
        <span className="tableRow--rank display-cell-flex text-verflow-ellipsis border-right border-left">
          {rank}
        </span>
      )}
      {notHide[1].status && (
        <span className="tableRow--fullname display-cell-flex text-verflow-ellipsis border-right tableRow--item-left">
          {fullName}
        </span>
      )}
      {notHide[2].status && (
        <span className="tableRow--email display-cell-flex text-verflow-ellipsis border-right tableRow--item-left">
          {email}
        </span>
      )}
      {notHide[3].status && (
        <span className="tableRow--LocationName display-cell-flex text-verflow-ellipsis border-right tableRow--item-left">
          {LocationName}
        </span>
      )}
      {notHide[4].status && (
        <span className="tableRow--role display-cell-flex text-verflow-ellipsis border-right">
          {role}
        </span>
      )}
      {notHide[5].status && (
        <span className="tableRow--phone display-cell-flex text-verflow-ellipsis border-right">
          {phone}
        </span>
      )}
      {notHide[6].status && (
        <span className="tableRow--date display-cell-flex text-verflow-ellipsis border-right">
          {new Date(date).toLocaleDateString(`${navigator.language}`)}
        </span>
      )}
      {notHide[7].status && (
        <span className="tableRow--payment display-cell-flex text-verflow-ellipsis border-right tableRow--item-right">
          {`${payment.currency} ${payment.amount}`}
        </span>
      )}
      {notHide[8].status && (
        <span className="tableRow--active display-cell-flex text-verflow-ellipsis border-right">
          {(isActive && "✓") || "×"}
        </span>
      )}
    </div>
  );
};
