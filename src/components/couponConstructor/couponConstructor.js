import React, {useContext, useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";

// Styles
import classes from './couponConstructor.module.scss'
import {Header} from "../Header/Header";
import {ThemeContext} from "../../App";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


export const CouponConstructor = ({questTheme}) => {
  const [title, setTitle] = useState('')
  const [promoCode, setPromoCode] = useState('');
  const myTheme = useContext(ThemeContext);

  const setTheme = () => {
    try {
      return createTheme(myTheme[questTheme]);
    } catch (e) {
      return createTheme({})
    }
  }

  return (
    <ThemeProvider theme={setTheme()}>
      <div className={`${classes.blockWrp} ${classes.couponAnimation}`}>
        <div
          className={classes.blockLeft}
          style={{
            backgroundColor: myTheme[questTheme].palette.primary.couponLight
          }}
        >
          <h1
            style={{
              color: myTheme[questTheme].palette.primary.couponSecondText
            }}
            className={classes.blockLeftText}
          >
            Coupon
          </h1>
          <div className={classes.blockLeftBorder}>
          </div>
        </div>
        <div
          className={classes.blockRight}
          style={{
            backgroundColor: myTheme[questTheme].palette.primary.couponMain
          }}>
          <div
            style={{color: myTheme[questTheme].palette.primary.couponTitleText}}
            className={classes.title}
          >
            {title}
          </div>
          {promoCode ?
            <div>
              <div
                style={{color: myTheme[questTheme].palette.primary.couponPromoText}}
                className={classes.promoCode}
              >
                PROMO CODE:
              </div>
              <div
                className={classes.promoCode}
                style={{color: myTheme[questTheme].palette.primary.couponSecondText}}
              >
                {promoCode}
              </div>
            </div>
            : <></>}
        </div>

      </div>
      <TextField
        required
        fullWidth
        inputProps={{maxlength: '33'}}
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
        inputProps={{maxlength: '13'}}
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
        onClick={() => {
        }}
      >Сохранить
      </Button>
    </ThemeProvider>
  );
};
