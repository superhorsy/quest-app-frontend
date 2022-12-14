import React from 'react';

// Styles
import classes from './couponConstructor.module.scss'

export const CouponConstructor = () => {
  return (
    <div className={classes.blockWrp}>
      <div className={classes.blockLeft}>
        <h1 className={classes.blockLeftText}>Coupon</h1>
        <div className={classes.blockLeftBorder}>
        </div>
        {/*<div className={classes.blockLeftText}>dsagdsgdsgsga</div>*/}
      </div>
      <div className={classes.blockRight}></div>
    </div>
  );
};
