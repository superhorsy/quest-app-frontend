import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {authSlice} from "./store/reducers/authSlice";

//Styles
import "./App.scss";

import {BrowserRouter} from 'react-router-dom';
import {AppRouter} from './components/AppRouter';

import "./App.scss";
import {TestComponent} from "./components/testComponent/testComponent";
import {getProfile} from "./store/actions/actions";

function App() {
    // const {isAuth} = useSelector(state => state.authReducer);
    // console.log("!!", isAuth);
    const {checkAuth} = authSlice.actions;
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(getProfile())
            dispatch(checkAuth());
            // store.checkAuth()
        }
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    );
}

export default App;
