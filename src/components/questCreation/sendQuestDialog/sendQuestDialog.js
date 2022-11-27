import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SendIcon from "@mui/icons-material/Send";

export const SendQuestDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2, mb: { xs: 2, sm: 3 }, py: 2 }}
        endIcon={<SendIcon />}
        onClick={handleClickOpen}
      >
        Отправить квест
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Отправть квест</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите email вашего друга для отправки квеста на почту.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleClose}>Отправить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
