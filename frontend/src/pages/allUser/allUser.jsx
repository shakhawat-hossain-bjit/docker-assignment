import React, { useEffect, useState } from "react";
import useUserHook from "../../hooks/user/useUserHook";
import { useSelector } from "react-redux";
import { GrEdit } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { bottomEndToast } from "../../utils/swalCreate";

const AllUser = () => {
  const {
    users,
    loadAllUser,
    deleteUserById,
    isLoadingDelete,
    deleteMessage,
    deleteSuccess,
  } = useUserHook();
  const [userList, setUsersList] = useState([]);
  const { userId } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllUser();
  }, []);

  useEffect(() => {
    setUsersList(users?.user);
    console.log(users?.user);
  }, [users]);

  const editUser = (id) => {
    console.log("edit user");
    navigate(`/dashboard/user/edit/${id}`);
  };

  const deleteUser = (id) => {
    deleteUserById(id);
  };

  useEffect(() => {
    if (isLoadingDelete == false && deleteMessage) {
      let icon = deleteSuccess ? "success" : "error";
      bottomEndToast.fire({
        icon: icon,
        title: deleteMessage,
      });
    }
    if (deleteSuccess) {
      loadAllUser();
    }
  }, [isLoadingDelete, deleteMessage, deleteSuccess]);

  return (
    <table>
      <thead>
        <tr>
          <th className="first-header">User Name</th>
          <th className="first-header">Email</th>
          <th className="first-header">Phone</th>
          <th className="first-header">Role</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {userList?.map((user) => (
          <tr key={user?._id}>
            <td>{user?.userName}</td>
            <td>{user?.email}</td>
            <td>{user?.user?.phone}</td>
            <td>{user?.role}</td>
            <td>
              <button
                disabled={user?.user?._id == userId ? true : false}
                onClick={() => editUser(user?.user?._id)}
              >
                <GrEdit />
              </button>
            </td>
            <td>
              <button
                disabled={user?.user?._id == userId ? true : false}
                onClick={() => deleteUser(user?.user?._id)}
              >
                <AiOutlineDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllUser;
