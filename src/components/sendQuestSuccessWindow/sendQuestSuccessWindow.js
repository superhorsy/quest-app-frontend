import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Alert, Snackbar} from "@mui/material";
import { hideSendQuestSuccessWindow } from "../../store/reducers/createdQuestsSlice";

export const SuccessWindow = () => {
  const sendQuestSucced = useSelector((state) => state.createdQuestsReducer.sendQuestSuccess);
  const dispatch = useDispatch();
  const message = "Квест успешно отправлен";

  const handleClose = () => {
    dispatch(hideSendQuestSuccessWindow(null));
  };
  return sendQuestSucced && (
    <>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={Boolean(sendQuestSucced)}
        autoHideDuration={1000} onClose={handleClose} in={"false"} >
        <Alert severity="success" sx={{width: '100%', mt: 7}}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};