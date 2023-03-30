import("./Modals.css");
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { borderColor } from "@mui/system";

export function CreateModal({ isOpenModal, setIsOpenModal, setRoom }) {
  const handleClose = () => setIsOpenModal(false) & setErrorMsg("");
  const [errorMsg, setErrorMsg] = useState("");
  const [newRoom, setNewRoom] = useState("");

  const moveToRoom = () => {
    if (newRoom === "" || newRoom === undefined) {
      return setErrorMsg("Please insert room name.");
    }

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
          <p>
            If room doesn't exist, it will be created.
            <br />
            <br /> Room name is case-sensitive
          </p>
          <input
            id="modal-input"
            className="default-input"
            placeholder="Room name..."
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
          />
          <p className="modal-error">{errorMsg}</p>
          <button
            className="default-button modal-button"
            onClick={() => moveToRoom()}
          >
            <p>Join room</p>
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export function JoinModal() {
  return <div>Join</div>;
}
