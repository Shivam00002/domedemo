import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/usersSlice";

function UserSelector({ onSelectUser }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const status = useSelector((state) => state.users.status);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    const selectedUser = users.find((user) => user.id === userId);
    onSelectUser(selectedUser);
  };

  if (status === "loading") {
    return <div>Loading users...</div>;
  }

  if (status === "failed") {
    return <div>Error loading users. Please try again.</div>;
  }

  return (
    <select
      value={selectedUserId}
      onChange={handleChange}
      className="w-full p-2 mb-4 border rounded"
    >
      <option value="">Select a user</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      ))}
    </select>
  );
}

export default UserSelector;
