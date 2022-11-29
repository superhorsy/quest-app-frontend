import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authSlice} from "./store/reducers/authSlice";

//Styles
import "./App.scss";

import {BrowserRouter} from 'react-router-dom';
import {AppRouter} from './components/AppRouter';

import "./App.scss";
//import {getProfile} from "./store/actions/actions";
import {fetchUserProfile} from './store/actions/actions';

function App() {
  const {checkAuth} = authSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserProfile())
      dispatch(checkAuth());
      // store.checkAuth()
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
