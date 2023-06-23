import React from "react";
import Modal from "react-modal";
import "../style/global.css";

const CustomModal = ({ isOpen, onClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        },
        content: {
          width: "400px", // Definir a largura desejada
          height: "134px", // Definir a altura desejada
          margin: "auto",
          borderRadius: "8px",
          padding: "20px",
        },
      }}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default CustomModal;
