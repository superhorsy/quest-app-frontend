import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {hideError} from "../../store/reducers/errorReducer";


export const ErrorWindow = () => {
  const {message} = useSelector(state => state.errorReducer);
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(hideError())
  };
  return message && (
    <>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={Boolean(message)}
        autoHideDuration={3000} onClose={handleClose} in={"false"}>
        <Alert severity="error" sx={{width: '100%', mt: 7}}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
