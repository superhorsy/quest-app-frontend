import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const Loader = () => {
  return <CircularProgress disableShrink sx={{m: "0 auto", mt: 10}}/>;
}