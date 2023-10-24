import { useEffect, useState } from "react";
import userAPI from "../../api/userAPI/userAPI";

const useUserHook = () => {
  const [users, setUsers] = useState({});
  const [user, setUser] = useState({});

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const { update, deleteUser, loadAll, getUser } = userAPI();

  const loadAllUser = () => {
    setIsLoadingUpdate(true);
    loadAll()
      .then((data) => {
        setUsers(data?.data);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to add money!";
        }
        setUsers({});
      })
      .finally(() => {});
  };

  const updateUser = (obj) => {
    setIsLoadingUpdate(true);
    update(obj)
      .then((data) => {
        console.log("data updated ", data);
        setUpdateSuccess(true);
        setUpdateMessage(data?.message);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to add money!";
        }
        setUpdateSuccess(false);
        setUpdateMessage(txt);
      })
      .finally(() => {
        setIsLoadingUpdate(false);
      });
  };

  const deleteUserById = (id) => {
    setIsLoadingDelete(true);
    deleteUser(id)
      .then((data) => {
        console.log("data updated ", data);
        setDeleteSuccess(true);
        setDeleteMessage(data?.message);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to add money!";
        }
        setDeleteSuccess(false);
        setDeleteMessage(txt);
      })
      .finally(() => {
        setIsLoadingDelete(false);
      });
  };

  const getUserById = (id) => {
    getUser(id)
      .then((data) => {
        setUser(data?.data);
      })
      .catch((e) => {
        let txt = "";
        if (e?.response?.data?.message) {
          txt = e?.response?.data?.message;
        } else {
          txt = "Failed to add money!";
        }
      })
      .finally(() => {});
  };

  return {
    updateUser,
    isLoadingUpdate,
    updateMessage,
    updateSuccess,

    deleteUserById,
    isLoadingDelete,
    deleteMessage,
    deleteSuccess,

    users,
    loadAllUser,

    getUserById,
    user,
  };
};

export default useUserHook;
