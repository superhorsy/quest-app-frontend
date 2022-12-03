import { useState } from "react";
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
import { Login, Settings, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo-sm-w.png";
import UserAvatar from "../../assets/images/avatar.jpg";
import { Outlet } from "react-router-dom";

export const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuth(false);
    navigate("/signin");
    handleCloseUserMenu();
  };

  const handleToMain = () => {
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleLogin = () => {
    // setIsAuth(true);
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
      name: "Выйти",
      function: handleLogout,
      icon: <Logout />,
    },
  ];
  
  return (
    <>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <CardActionArea onClick={handleToMain}>
                <img src={Logo} alt="logo" />
              </CardActionArea>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {isAuth ? (
                <>
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
      <Container maxWidth="lg">
        <Box sx={{ mt: 10 }}>
          <Outlet context={[isAuth, setIsAuth]} />
        </Box>
      </Container>
    </>
  );
};
