import React, {useContext, useState} from 'react';

// Styles
import classes from './couponConstructor.module.scss'
import Button from "@mui/material/Button";

export const CouponConstructor = () => {
  const [title, setTitle] = useState('Ты выиграл промокод на скидку 50% в парк развлечений')
  const [promoCode, setPromoCode] = useState('6CD435SDH');
  // const theme = useContext(theme)
  const [theme, setTheme] = useState({
    leftBlock: {
      backgroundColor: 'red',
    },
    rightBlock: {
      borderRadius: `${10}px`,
      borderLeft: '1px dashed white',
      width: '200px',
      height: '106px',
      backgroundColor: '#2b46aa',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      boxSizing: 'border-box',
      justifyContent: 'center',
    }
  })

  return (
    <div>
      <div className={classes.blockWrp}>
        <div className={classes.blockLeft}>
          <h1 className={classes.blockLeftText}>Coupon</h1>
          <div className={classes.blockLeftBorder}>
          </div>
        </div>
        <div style={theme.rightBlock}>
          <div className={classes.title}>{title}</div>
          {promoCode ?
            <div>
              <div className={classes.promoCode}>PROMO CODE:</div>
              <div className={classes.promoCode}>{promoCode}</div>
            </div>
            : <></>}
        </div>

      </div>
      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    return setTheme({...theme, rightBlock: {...theme.rightBlock, backgroundColor: 'coral'}})*/}
      {/*  }}*/}
      {/*  sx={{color: 'coral'}}*/}
      {/*>*/}
      {/*  Make Coral*/}
      {/*</Button>*/}
    </div>
  );
};
