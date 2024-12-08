import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface UserModalProps {
  visible: boolean;
  user: any;
  onClose: () => void;
  onAddUser: (name: string, email: string) => void;
  onUpdateUser: (id: string, name: string, email: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  user,
  onClose,
  onAddUser,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = () => {
    if (user?.id) {
      onUpdateUser(user.id, name, email);
    } else {
      onAddUser(name, email);
    }
  };

  return (
    <Modal
      isOpen={visible}
      onRequestClose={onClose}
      contentLabel="User Modal"
      ariaHideApp={false}
      className="modal"
    >
      <h2>{user?.id ? "Edit User" : "Add User"}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="modal-buttons">
        <button onClick={handleSubmit}>Submit</button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default UserModal;
