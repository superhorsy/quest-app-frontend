import React, { useEffect, useState } from 'react';
import {
  Button,
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  CardActionArea
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Login, Settings, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo-sm-w.png";
import UserAvatar from "../../assets/images/avatar.jpg";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../store/reducers/authSlice";
//import userProfileReducer from "../../store/reducers/userProfileSlice";
import { fetchUserProfile } from "../../store/actions/actions";
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth } = useSelector(state => state.authReducer);
  const { profile } = useSelector((state) => state.userProfileReducer);
  const { logOut } = authSlice.actions;

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logOut());
    navigate("/signin");
  };

  const handleToMain = () => {
    navigate("/");
  };

  const handleToPanel = () => {
    navigate("/panel");
  };

  const goToProfile = () => {
    handleCloseUserMenu();
    navigate("/panel/profile");
  };

  const goToPanel = () => {
    handleCloseUserMenu();
    navigate("/panel");
  }

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const userMenu = [
    {
      name: "Профиль",
      function: goToProfile,
      icon: <Settings />,
    },
    {
      name: "Панель",
      function: goToPanel,
      icon: <DashboardIcon />,
    },
    {
      name: "Выйти",
      function: handleLogout,
      icon: <Logout />,
    },
  ];

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, isAuth])

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <CardActionArea onClick={isAuth ? handleToPanel : handleToMain}>
                <img src={Logo} alt="logo" />
              </CardActionArea>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {isAuth ? (
                <>
                  <span>Привет, {profile?.first_name} </span>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="user" src={UserAvatar} />
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {userMenu.map((nav) => (
                      <MenuItem onClick={nav.function} key={nav.name}>
                        <ListItemIcon>{nav.icon}</ListItemIcon>
                        {nav.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  sx={{ color: "white" }}
                  onClick={handleLogin}
                  endIcon={<Login />}
                >
                  Войти
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl">
        <Box>
          {/*<Outlet context={[isAuth, setIsAuth]} />*/}
          <Breadcrumbs />
          <Outlet />
        </Box>
      </Container>
    </>
  );
};
