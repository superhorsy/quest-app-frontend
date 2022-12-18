import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authSlice} from "./store/reducers/authSlice";
import {MyTheme} from "./themes/theme"

//Styles
import "./App.scss";

import {RouterProvider} from 'react-router-dom';
import {routes} from './components/AppRouter';

import "./App.scss";
import {fetchUserProfile} from './store/actions/actions';

export const ThemeContext = React.createContext()


function App() {
  const {checkAuth} = authSlice.actions;
  const dispatch = useDispatch();
  const {isAuth} = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserProfile())
      dispatch(checkAuth());
    }
  }, [checkAuth, dispatch]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUserProfile())
      dispatch(checkAuth());
    }
  }, [checkAuth, dispatch]);

  return (
    <ThemeContext.Provider value={MyTheme}>
      <div className="App">
        <RouterProvider router={routes(isAuth)}/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
