import React, {useContext} from 'react';
import {createTheme, ThemeProvider} from "@mui/material/styles";

// Styles
import classes from './coupon.module.scss'
import {ThemeContext} from "../../../App";

export const Coupon = ({questTheme, data}) => {
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
            {data.message}
          </div>
          {data.value ?
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
                {data.value}
              </div>
            </div>
            : <></>}
        </div>
      </div>
    </ThemeProvider>
  );
};
