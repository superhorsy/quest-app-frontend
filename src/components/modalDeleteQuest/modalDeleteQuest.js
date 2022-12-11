import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export const DeleteQuestDialog = ({
  isOpenDialog,
  handleClose,
  questNameToDelete,
  handleAction,
}) => {
  return (
    <Dialog isOpenDialog={isOpenDialog} onClose={handleClose()}>
      <DialogTitle>
                Вы уверены, что хотите удалить квест {questNameToDelete}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
                    Это действие приведет к безвозвратному удалению квеста
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Отмена</Button>
        <Button onClick={() => handleAction()}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
};
