import React,{useEffect} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export const SendQuestDialog = ({
  isOpen,
  handleClose,
  questNameToSend,
  handleAction,
  friendName,
  setFriendName,
  email,
  setEmail,
  emailError,
  setEmailError,
  formValid,
  setFormValid
}) => {
  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!re.test(String(e.target.value).toLowerCase())){
      setEmailError("Некорректный email")
    } else {
      setEmailError("")
    }
  }

  //есть ли разница в модальном окне это или в том где вызывается
  useEffect(() => {
    if (emailError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError])

  const isEmptyField = !friendName || !email;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Отправить квест: {questNameToSend}</DialogTitle>
      <DialogContent>
        <DialogContentText>
                    Введите имя и email вашего друга для отправки квеста на почту.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Имя друга"
          fullWidth
          variant="standard"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => emailHandler(e)}
        />
        {emailError && <DialogContentText>{emailError}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Отмена</Button>
        <Button onClick={() => handleAction()} disabled={isEmptyField || !formValid} >Отправить</Button>
      </DialogActions>
    </Dialog>
  );
};
