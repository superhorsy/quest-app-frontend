import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import avatarLogo from '../../assets/images/avatar-icon.jpg'


export const UserProfile = () => {

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const avatar = avatarLogo;
  
  const sendData = (event) => {
    event.preventDefault();
  }

  const isEmptyField = !email || !nickname;

  return (
    <div className="page-container">
      <div className="main-container">

        <h1 className="title">Мой Профиль</h1>
        <img src = {avatar} className="avatar-logo" alt="avatar" />

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
              label="Ваш Никнейм"
              variant="outlined"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <TextField
              required
              fullWidth
              sx={{mb: {xs: 3, sm: 4}}}
              id="outlined-basic"
              type="Ваш email"
              label="Ваш email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <Button
                fullWidth
                type="submit"
                sx={{mb: {xs: 4, sm: 6}}}
                variant="contained"
                size="large"
                disabled={isEmptyField}
              >Изменить пароль
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
    
