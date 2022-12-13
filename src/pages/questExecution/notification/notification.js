import React from "react";
import { useDispatch } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { hideAnswerNotification } from "../../../store/reducers/questExecutionSlice";

export const Notification = ({ notification }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideAnswerNotification(true));
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={notification.visible}
      autoHideDuration={1000}
      onClose={handleClose}
      in={"false"}
    >
      <Alert severity={notification.success ? "success":"error"} sx={{ width: "100%", mt: 30 }}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};
