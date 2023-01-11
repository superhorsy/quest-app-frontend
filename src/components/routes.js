import React from 'react';
import {Navigate} from 'react-router-dom'

export const PublicRoute = ({isAuth, to = "/panel", children}) => {
  return !isAuth ? children : <Navigate to={to} replace/>
};

export const PrivateRoute = ({isAuth, to = "/", children}) => {
  return isAuth ? children : <Navigate to={to} replace/>
};

export const AdminRoute = ({isAdmin, to = '/', children}) => {
  return isAdmin ? children : <Navigate to={to} replace/>
}