import React, {useContext, useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {useOutletContext} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {login} from "../../store/actions/actions";

//Style
import classes from './loginPage.module.scss';
import {useDispatch, useSelector} from "react-redux";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    // const [isAuth, setIsAuth] = useOutletContext();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isAuth, user} = useSelector(state => state.authReducer)
    //console.log('isAut', isAuth)
    //console.log('user', user)

    const isEmptyField = !email || !pass;

    const sendData = (event) => {
        console.log('Метод отправки')
        dispatch(login({password: pass, email}));
        event.preventDefault();
    }

    useEffect(() => {
        if (isAuth) {
            console.log('isAuth header',isAuth)
            navigate("/panel");
        }
    }, [isAuth])

    return (
        <div className="page-container">

            {/*<div className="temporary-header"/>*/}

            <div className="main-container">
                <h1 className="title">Авторизация</h1>

                <Box
                    component="form"
                    sx={{
                        m: '0 auto',
                        textAlign: "center",
                        width: {xs: 1 / 1, sm: 500},
                    }}
                    noValidate={false}
                    autoComplete="off"
                    onSubmit={sendData}
                >
                    <div>

                        <TextField
                            required
                            fullWidth
                            sx={{mb: {xs: 3, sm: 4}}}
                            id="outlined-basic-email"
                            label="Ваш email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            sx={{mb: {xs: 3, sm: 4}}}
                            id="outlined-basic-password"
                            label="Пароль"
                            type="password"
                            variant="outlined"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <div className="textToRightSide">
                            <span>Забыли пароль? </span>
                            <Link to="/restore">Восстановить
                            </Link>
                        </div>
                        <div>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{mb: {xs: 4, sm: 6}}}
                                variant="contained"
                                size="large"
                                disabled={isEmptyField}
                                // onClick={() => navigate('/profile')} // тут не нужен онКлик т.к. кнопка имеет тип submit и выполняет сабмит формы
                            >Войти
                            </Button>
                            <div>
                                <span>Ещё нет аккаунта? </span>
                                <Link to="/signup">Зарегистрироваться</Link>
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    )
};
