import React, {cloneElement, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";

// Api
import {userProfileApi} from "../../api/api";
import {CouponConstructor} from "../couponConstructor/couponConstructor";

const style = {
  // display: 'flex',
  // flexDirection: 'column',
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

export const MyModal = ({buttonProps, buttonTitle, children}) => {
  const [open, setOpen] = useState(false);
  // const [error, setError] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Добавление сеттера в пропсы children для закрытия модального окна
  children = cloneElement(children, {...children.props, handleClose})

  return (
    <div>
      <Button
        {...buttonProps}
        onClick={handleOpen}
      >
        {buttonTitle.title}
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
          // component="form"
          // noValidate={false}
          // autoComplete="off"
          // onSubmit={handleSubmitEditPassword}
          sx={style}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
};
