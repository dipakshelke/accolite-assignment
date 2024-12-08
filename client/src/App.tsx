import React, { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, updateUser } from "./api/users";
import UserList from "./components/UserList";
import UserModal from "./components/UserModal";
import DeleteModal from "./components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const App = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const handleAddUser = async (name: string, email: string) => {
    const newUser = await createUser(name, email);
    setUsers([...users, newUser]);
    setModalVisible(false);
    toast.success("User added successfully!");
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      const result = await deleteUser(userToDelete.id);
      if (result.success) {
        setUsers(users.filter((user) => user.id !== userToDelete.id));
        toast.success("User deleted successfully!");
      } else {
        toast.error("Failed to delete user");
      }
      setDeleteModalVisible(false);
    }
  };

  const handleUpdateUser = async (id: string, name: string, email: string) => {
    const updatedUser = await updateUser(id, name, email);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    setModalVisible(false);
    setEditingUser(null);
    toast.success("User updated successfully!");
  };

  return (
    <div className="App">
      <UserList
        users={users}
        onDeleteUser={(user) => {
          setUserToDelete(user);
          setDeleteModalVisible(true);
        }}
        onEditUser={(user) => {
          setEditingUser(user);
          setModalVisible(true);
        }}
      />
      <UserModal
        visible={modalVisible}
        user={editingUser}
        onClose={() => setModalVisible(false)}
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
      />
      <DeleteModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirmDelete={handleDeleteUser}
        user={userToDelete}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
