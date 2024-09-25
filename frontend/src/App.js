import React, { useState } from 'react';
import UserSelector from './components/UserSelector';
import HomeList from './components/HomeList';
import EditUserModal from './components/EditUserModal';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingHome, setEditingHome] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleEditUser = (home) => {
    setEditingHome(home);
  };

  const handleCloseModal = () => {
    setEditingHome(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Homes for User</h1>
      <UserSelector onSelectUser={handleUserSelect} />
      {selectedUser && (
        <HomeList
          userId={selectedUser.id}
          onEditUser={handleEditUser}
        />
      )}
      {editingHome && (
        <EditUserModal
          home={editingHome}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;