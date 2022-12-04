import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";

// Api
import {userProfileApi} from "../../api/api";

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: 300, md: 400},
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  fontSize: {xs: "14px", md: "20px"},
  transition: 'transform 3s'
};

export const ModalRestorePass = (children) => {
  const [open, setOpen] = React.useState(false);
  const [passForm, setPassForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  console.log("!!!!", children)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isEmptyField = !passForm.currentPassword || !passForm.newPassword || !passForm.confirmPassword;
  const isPassMatched = passForm.newPassword === passForm.confirmPassword;

  const handleSubmitEditPassword = async (event) => {
    event.preventDefault();
    try {
      await userProfileApi.changePassword(passForm.newPassword);
      setError(null);
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <Button
        {...children}
        onClick={handleOpen}
      >
        Изменить пароль
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        slotProps={{backdrop: {timeout: 500, transition: 'backdropFilter 5s'} }}
        sx={{
          backdropFilter: 'blur(5px)',
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          noValidate={false}
          autoComplete="off"
          onSubmit={handleSubmitEditPassword}
          sx={style}>
          <TextField
            disabled={false}
            required
            fullWidth
            sx={{mb: {xs: 3, sm: 4}}}
            id="outlined-basic-current-pass"
            type="password"
            label="Ваш текущий пароль"
            variant="outlined"
            value={passForm.currentPassword}
            onChange={(e) => setPassForm({...passForm, currentPassword: e.target.value})}
          />
          <TextField
            disabled={false}
            required
            fullWidth
            sx={{mb: {xs: 3, sm: 4}}}
            id="outlined-basic-new-pass"
            type="password"
            label="Новый пароль"
            variant="outlined"
            value={passForm.newPassword}
            onChange={(e) => setPassForm({...passForm, newPassword: e.target.value})}
          />
          <TextField
            disabled={false}
            error={!isPassMatched && Boolean(passForm.confirmPassword)}
            required
            fullWidth
            sx={{mb: {xs: 3, sm: 4}}}
            id="outlined-basic-confirm-pass"
            type="password"
            label="Подтвердите пароль"
            variant="outlined"
            value={passForm.confirmPassword}
            onChange={(e) => setPassForm({...passForm, confirmPassword: e.target.value})}
          />
          <Button
            fullWidth
            type="submit"
            sx={{mb: 4}}
            variant="contained"
            size="large"
            disabled={isEmptyField || !isPassMatched}
          >
            Сохранить
          </Button>
          {error ?
            <Typography
              id="modal-modal-title-error"
              variant="h6"
              component="h2"
              color="error"
              sx={{fontSize: "inherit"}}
            >
              Ошибка обработки запроса: {error}
            </Typography>
            :
            <></>
          }
        </Box>
      </Modal>
    </div>
  );
};
