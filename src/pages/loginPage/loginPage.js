import React, { useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import {useNavigate} from "react-router-dom";

//Style
// import classes from './loginPage.module.scss';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isAuth, setIsAuth] = useOutletContext();
  const navigate = useNavigate();

  // Захардкодил юзера пока так
  const user = {
    email: '123@123',
    pass: '123'
  };

  const isEmptyField = !email || !pass;

  const sendData = (event) => {
    event.preventDefault();
    // Пока что отправляем в консоль
    console.log(
      {
        email: email,
        pass: pass
      }
    )

    // Тут пока что заглушка
    const isAuthorized = user.email === email && user.pass === pass;
    if (isAuthorized) {
      setIsAuth(true);
      navigate("/panel");
    }
  }

  return (
    <div className="page-container">

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
              id="outlined-basic"
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
              id="outlined-basic"
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
                onClick={() => navigate('/profile')}
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
