import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { authSlice } from "./store/reducers/authSlice";

//Styles
import "./App.scss";

import { RouterProvider } from 'react-router-dom';
import { routes } from './components/AppRouter';

import "./App.scss";
//import {getProfile} from "./store/actions/actions";
import { fetchUserProfile } from './store/actions/actions';

function App() {
  const { checkAuth } = authSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserProfile())
      dispatch(checkAuth());
      // store.checkAuth()
    }
  }, [checkAuth, dispatch]);

  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
