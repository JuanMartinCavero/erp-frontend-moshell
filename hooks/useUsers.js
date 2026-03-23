import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userApi";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const addUser = async (user) => {
    const newUser = await createUser(user);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const editUser = async (id, user) => {
    const updated = await updateUser(id, user);

    setUsers(users.map((u) => (u.id === id ? updated : u)));
  };

  const toggleUserStatus = async (user) => {
    await deleteUser(user.id);

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id ? { ...u, estado: u.estado === 1 ? 0 : 1 } : u,
      ),
    );
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    addUser,
    editUser,
    toggleUserStatus,
    fetchUsers,
  };
};
