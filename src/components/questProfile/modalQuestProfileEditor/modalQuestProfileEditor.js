import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";

// Api
// import {userProfileApi} from "../../api/api";
import {useDispatch} from "react-redux";
import {updateProfileQuest} from "../../../store/reducers/currentQuestSlice";

const style = {
  position: 'absolute',
  top: '50%',
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

export const ModalQuestProfileEditor = ({questData, buttonProps, recipients}) => {
  const [open, setOpen] = React.useState(false);
  const [questProfileForm, setQuestProfileForm] = useState({
    name: questData.name,
    description: questData.description,
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isEmptyField = !questProfileForm.name || !questProfileForm.description;

  const handleSubmitQuestProfileForm = async (event) => {
    event.preventDefault();
    dispatch(updateProfileQuest(questProfileForm));
    handleClose();
  }

  return (
    <div
      style={{marginRight: '10px'}}
    >
      <Button
        disabled={recipients?.length > 0}
        {...buttonProps}
        onClick={handleOpen}
      >
        Редактировать
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {backdropFilter: 'blur(10px)'}
          },
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          noValidate={false}
          autoComplete="off"
          onSubmit={handleSubmitQuestProfileForm}
          sx={style}>
          <TextField
            disabled={false}
            required
            fullWidth
            sx={{mb: {xs: 3, sm: 4}}}
            id="outlined-basic-form-name"
            type="text"
            label="Название квеста"
            variant="outlined"
            value={questProfileForm.name}
            onChange={(e) => setQuestProfileForm({...questProfileForm, name: e.target.value})}
          />
          <TextField
            disabled={false}
            required
            fullWidth
            sx={{mb: {xs: 3, sm: 4}}}
            id="outlined-basic-form-description"
            type="text"
            label="Описание квеста"
            variant="outlined"
            value={questProfileForm.description}
            onChange={(e) => setQuestProfileForm({...questProfileForm, description: e.target.value})}
          />
          <Button
            fullWidth
            type="submit"
            sx={{mb: 4}}
            variant="contained"
            size="large"
            disabled={isEmptyField}
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