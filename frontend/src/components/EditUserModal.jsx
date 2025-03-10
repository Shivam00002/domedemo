import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByHome, updateHomeUsers } from "../store/homesSlice";

function EditUserModal({ home, onClose }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUsersByHome(home.id))
      .unwrap()
      .then((homeUsers) => {
       
 setSelectedUsers(homeUsers.map((user) => user.id));
        setIsLoading(false);
      });
  }, [dispatch, home.id]);

  const handleToggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSave = () => {
    dispatch(updateHomeUsers({ homeId: home.id, userIds: selectedUsers }))
      .unwrap()
      .then(() => onClose());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          Edit Users for {home.address}
        </h2>
        <div className="mb-4">
          {users.map((user) => (
            <label key={user.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleToggleUser(user.id)}
                className="mr-2"
              />
              {user.username}
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={selectedUsers.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserModal;
