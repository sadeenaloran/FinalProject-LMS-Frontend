import { useState, useEffect } from "react";
import api from "../api/index";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/users");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      const response = await api.post("/admin/users", userData);
      setUsers((prev) => [...prev, response.data.user]);
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || "Failed to create user";
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, userData);
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? response.data.user : user))
      );
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || "Failed to update user";
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      throw err.response?.data?.error || "Failed to delete user";
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUsers;
