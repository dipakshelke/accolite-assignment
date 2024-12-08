import React from "react";
import Modal from "react-modal";

interface DeleteModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  user: any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  onClose,
  onConfirmDelete,
  user,
}) => {
  return (
    <Modal
      isOpen={visible}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation"
      ariaHideApp={false}
      className="modal"
    >
      <h2>Are you sure you want to delete this user?</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <button className="delete" onClick={onConfirmDelete}>
        Yes, delete
      </button>
      <button className="close-button" onClick={onClose}>
        Cancel
      </button>
    </Modal>
  );
};

export default DeleteModal;
