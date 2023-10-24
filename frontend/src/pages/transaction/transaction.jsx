import React, { useEffect, useState } from "react";
import "./transaction.style.scss";
import TransactionCard from "./transactionCard/transactionCard";
import { useLocation } from "react-router-dom";
import useTransactiontHook from "../../hooks/transaction/useTransactionHook";

const Transaction = () => {
  const [trans, setTrans] = useState([]);
  const location = useLocation();
  const { transaction, mytransaction, loadTransactionById, loadTransactions } =
    useTransactiontHook();

  useEffect(() => {
    if (location.pathname == "/dashboard/transaction") setTrans(transaction);
    else if (location.pathname == "/user/transaction") setTrans(mytransaction);
  }, [transaction, mytransaction]);

  console.log("transaction", transaction);

  useEffect(() => {
    if (location.pathname == "/dashboard/transaction") loadTransactions();
    else if (location.pathname == "/user/transaction") loadTransactionById();
  }, []);

  //   console.log("location ", location);

  return (
    <div>
      <div className="container">
        <div className=" transaction-container">
          <h1 className="transaction-title">Transaction</h1>
          <div className="transaction-item-container">
            <hr />
            {trans?.map((x) => (
              <TransactionCard props={x} key={x?.book?.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
