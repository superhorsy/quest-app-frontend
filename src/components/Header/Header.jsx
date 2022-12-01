import React, {useEffect, useState} from 'react';
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
} from "@mui/material";
import {Login, Settings, Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

import Logo from "../../assets/images/logo-sm-w.png";
import UserAvatar from "../../assets/images/avatar.jpg";
import {Outlet} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {authSlice} from "../../store/reducers/authSlice";
//import userProfileReducer from "../../store/reducers/userProfileSlice";
import {fetchUserProfile} from "../../store/actions/actions";

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAuth} = useSelector(state => state.authReducer);
  const {profile} = useSelector((state) => state.userProfileReducer);
  const {logOut} = authSlice.actions;

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/signin");
    handleCloseUserMenu();
  };

  const goToProfile = () => {
    navigate("/profile");
  };

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
      icon: <Settings/>,
    },
    {
      name: "Выйти",
      function: handleLogout,
      icon: <Logout/>,
    },
  ];

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchUserProfile())
    }
  }, [isAuth])

  return (
    <>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{flexGrow: 1}}>
              <img src={Logo} alt="logo"/>
            </Box>
            <Box sx={{flexGrow: 0}}>
              {isAuth ? (
                <>
                  <span>Привет, {profile?.data.first_name} </span>
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt="user" src={UserAvatar}/>
                  </IconButton>
                  <Menu
                    sx={{mt: "45px"}}
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
                  sx={{color: "white"}}
                  onClick={handleLogin}
                  endIcon={<Login/>}
                >
                  Войти
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl">
        <Box sx={{mt: 10}}>
          {/*<Outlet context={[isAuth, setIsAuth]} />*/}
          <Outlet/>
        </Box>
      </Container>
    </>
  );
};
