// React
import React, {useMemo, useState} from 'react';

// Redux
import {useDispatch} from "react-redux";

// Router
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

// UI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// Api comps
import {registration} from "../../store/actions/actions";

export const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendData = (event) => {
    event.preventDefault();

    dispatch(registration({
      first_name: firstName,
      last_name: lastName,
      nickname: nickname,
      password: pass,
      email: email,
    }))

    setFirstName('');
    setLastName('');
    setEmail('');
    setNickname('');
    setPass('');
    setPassConfirm('');
  }

  const isEmptyField = !firstName || !lastName || !email || !nickname || !pass || !passConfirm;
  const isPassMatched = passConfirm === pass;


  return (
    <div className="page-container">

      <div className="main-container">

        <h1 className="title">Регистрация</h1>

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
              id="outlined-basic-firstname"
              label="Имя"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              sx={{mb: {xs: 3, sm: 4}}}
              id="outlined-basic-lastname"
              label="Фамилия"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              sx={{mb: {xs: 3, sm: 4}}}
              id="outlined-basic-email"
              type="email"
              label="Ваш email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              fullWidth
              sx={{mb: {xs: 3, sm: 4}}}
              id="outlined-basic-nickname"
              label="Никнейм"
              variant="outlined"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <TextField
              required
              fullWidth
              sx={{mb: {xs: 3, sm: 4}}}
              id="outlined-basic-password"
              type="password"
              label="Пароль"
              variant="outlined"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <TextField
              error={!isPassMatched && Boolean(passConfirm)}
              required
              fullWidth
              sx={{mb: {xs: 3, sm: 4}}}
              id="outlined-basic-password-confirm"
              type="password"
              label="Подтвердите пароль"
              variant="outlined"
              value={passConfirm}
              onChange={(e) => setPassConfirm(e.target.value)}
            />
            <div>
              <Button
                fullWidth
                type="submit"
                sx={{mb: {xs: 4, sm: 6}}}
                variant="contained"
                size="large"
                disabled={isEmptyField || !isPassMatched}
              >Зарегистрироваться
              </Button>
              <div>
                <span>Уже есть аккаунт? </span>
                <Link to="/signin">Войти</Link>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};