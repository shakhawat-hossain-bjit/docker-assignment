import React from "react";
import "./transactionCard.style.scss";
const TransactionCard = ({ props }) => {
  const { total, books, createdAt, paymentMethod, user } = props;

  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  const formattedDate = date.toLocaleString("en-US", options);

  return (
    <div className="transaction-card-container">
      <div className="transaction-card-info">
        <div>
          <p>{user?.userName}</p>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
        </div>
        <div>
          <p>Payment method : {paymentMethod}</p>
          <p>{formattedDate}</p>
        </div>
      </div>

      <div className="transaction-card-table-container">
        <table>
          <tr>
            <th>title</th>
            <th>quantity</th>
            <th>Actual price</th>
            <th>price</th>
          </tr>

          {books.map((x) => (
            <tr>
              <td>{x?.book?.title}</td>
              <td>{x?.quantity}</td>
              <td>{x?.book?.price}</td>
              <td>{x?.price}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>Total Amount</td>
            <td>{total.toFixed(2)}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default TransactionCard;
