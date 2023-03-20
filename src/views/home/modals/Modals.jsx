import("./Modals.css");
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export function CreateModal({ isOpenModal, setIsOpenModal, setRoom }) {
  const handleOpen = () => setIsOpenModal(true);
  const handleClose = () => setIsOpenModal(false);

  const [newRoom, setNewRoom] = useState();

  const moveToRoom = () => {
    setRoom(newRoom);
    setIsOpenModal(false);
  };

  return (
    <div className="modal">
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Join room
          </Typography>
          <input
            className="default-input"
            placeholder="Room name..."
            onChange={(e) => setNewRoom(e.target.value)}
          />
          <button
            className="default-button modal-button"
            style={{ display: "block" }}
            onClick={() => moveToRoom()}
          >
            Join room
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export function JoinModal() {
  return <div>Join</div>;
}
