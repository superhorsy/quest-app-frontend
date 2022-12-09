import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
// import Logo from "../../assets/images/log-b.png";
import Logo from "../../assets/images/logo-n.png";
import { useSelector } from "react-redux";

export const StartPage = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector(state => state.authReducer);
  console.log(isAuth);
  return (
    <div className="page-container">

      <span className="welcomeTitle">Рады видеть вас в</span>
      <div className='logoBox'>
        <img src={Logo} alt="logo" />
      </div>
      {isAuth ?
        <span
          className="welcomeText">Вы успешно залогинены! Перейдите в панель для начала работы</span>
        :
        <span
          className="welcomeText">Для полноценной работы приложения войдите в ваш аккаунт, либо зарегистрируйтесь</span>
      }


      <div className="main-container">
        <Box
          sx={{
            m: '0 auto',
            textAlign: "center",
            // width: {xs: 8 / 10, sm: 500},
          }}
        >
          {isAuth ?
            <Button
              fullWidth
              type="submit"
              sx={{
                // width: {xs: '100%'},
                mb: { xs: 4, sm: 6 }
              }}
              variant="contained"
              size="large"
              onClick={() => navigate('panel')}
            >В панель
            </Button>
            :
            <Button
              fullWidth
              type="submit"
              sx={{
                // width: {xs: '100%'},
                mb: { xs: 4, sm: 6 }
              }}
              variant="contained"
              size="large"
              onClick={() => navigate('signup')}
            >Зарегистрироваться
            </Button>
          }

        </Box>
      </div>
    </div>
  );
};