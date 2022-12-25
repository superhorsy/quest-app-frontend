import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addCoupon} from "../../store/reducers/currentQuestSlice";

// MUI Comps
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Custom Comps
import {Coupon} from "./coupon/coupon";

export const CouponConstructor = ({questTheme, setOpen}) => {
  const currentQuest = useSelector(
    (state) => state.currentQuestReducer.currentQuest
  );
  const [title, setTitle] = useState(currentQuest.rewards !== null ? currentQuest.rewards[0].message : '')
  const [promoCode, setPromoCode] = useState(currentQuest.rewards !== null ? currentQuest.rewards[0].value : '');
  const dispatch = useDispatch()

  const onCouponSave = (handleClose) => {
    dispatch(addCoupon({
      type: 'coupon',
      message: title,
      value: promoCode,
    }));
    setOpen()
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Coupon questTheme={questTheme} data={{message: title, value: promoCode}}/>
      <TextField
        required
        fullWidth
        inputProps={{maxLength: '33'}}
        helperText='Допускается не более 33 символов'
        sx={{mb: {xs: 3, sm: 4}}}
        id="outlined-basic-title"
        label="Укажите текст купона"
        type="text"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        // required
        fullWidth
        inputProps={{maxLength: '13'}}
        helperText='Допускается не более 13 символов'
        sx={{mb: {xs: 3, sm: 4}}}
        id="outlined-basic-promo"
        label="Промокод"
        type="text"
        variant="outlined"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <Button
        fullWidth
        // type="submit"
        sx={{mb: {xs: 4, sm: 6}}}
        variant="contained"
        size="large"
        // disabled={isEmptyField}
        onClick={onCouponSave}
      >Сохранить
      </Button>
    </div>
  );
};
