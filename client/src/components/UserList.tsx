import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
  onDeleteUser: (user: User) => void;
  onEditUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onDeleteUser,
  onEditUser,
}) => {
  return (
    <div className="user-list">
      <button
        className="add-user-btn"
        onClick={() => onEditUser({ id: "", name: "", email: "" })}
      >
        Add User
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <div className="action-btns"></div>

              <td className="action-btns">
                <button
                  className="table-btn edit"
                  onClick={() => onEditUser(user)}
                >
                  Edit
                </button>
                <button
                  className="table-btn delete"
                  onClick={() => onDeleteUser(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
