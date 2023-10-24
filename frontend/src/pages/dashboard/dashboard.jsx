import React from "react";
import "./dashboard.style.scss";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

// // dummy data
// const arr = [
//   { id: 1, title: "News 1", author: "Author 1", source: "Source 1" },
//   { id: 2, title: "News 2", author: "Author 2", source: "Source 2" },
//   { id: 3, title: "News 3", author: "Author 3", source: "Source 3" },
// ];

const Dashboard = () => {
  // const [newsList, setNewsList] = useState(arr);
  // const [selectedRows, setSelectedRows] = useState([]);
  // const handleRowClick = (id) => {
  //   if (selectedRows.includes(id)) {
  //     setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  //   } else {
  //     setSelectedRows([...selectedRows, id]);
  //   }
  // };
  return (
    <div className="app">
      <div className="sidebar">
        <div className="navigation">
          <h4>Admin Dashboard</h4>
          <p>
            <Link to="/dashboard/user">User List</Link>
          </p>
          <p>
            <Link to="/dashboard/insert-book">Insert Book</Link>
          </p>
          <p>
            <Link to="/books">Update Book</Link>
          </p>
          <p>
            <Link to="/books">Delete Book</Link>
          </p>
          <p>
            <Link to="/dashboard/transaction">View Transaction</Link>
          </p>
        </div>
        {/* <button className="sidebar-btn">Back to home</button> */}
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
