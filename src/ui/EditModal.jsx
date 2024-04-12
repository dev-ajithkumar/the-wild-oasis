import Modal from "react-modal";
Modal.setAppElement("#root");
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    width: "800px",
    height: "630px",
    margin: "auto",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  },
};

function EditModal({ isOpen, onRequestClose, contentLabel, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={contentLabel}
    >
      {children}
    </Modal>
  );
}

export default EditModal;
