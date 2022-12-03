import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import avatarLogo from "../../assets/images/avatar-icon.jpg";
import { fetchUserProfile } from "../../store/actions/actions";


export const UserProfile = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [isEditProfile, setIsEditProfile] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile())

  }, [])


  const profile = useSelector((state) => state.userProfileReducer.profile);
  //const userEmail = profile.email;
  //const userNickname = profile.nickname;
console.log("профиль пользователя",profile);
  const avatar = avatarLogo;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  const handleSubmitEditProfile = (event) => {
    event.preventDefault();
  };

  const isEmptyField = !email || !nickname;

  
 

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Мой Профиль</h1>
        <img src={avatar} className="avatar-logo" alt="avatar" />

        { profile && <Box
          component="div"
          sx={{
            m: "0 auto",
            textAlign: "center",
            width: { xs: 1 / 1, sm: 500 },
          }}
        >
          <Box
            component="form"
            sx={{
              m: "0 auto",
              textAlign: "center",
              width: { xs: 1 / 1, sm: 500 },
            }}
            noValidate={false}
            autoComplete="off"
            onSubmit={handleSubmitEditProfile}
          >
            <div>
              <TextField
                disabled={!isEditProfile}
                required
                fullWidth
                sx={{ mb: { xs: 3, sm: 4 } }}
                id="outlined-basic"
                label="Ваш Никнейм"
                variant="outlined"
                //value={nickname}
                value={userNickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <TextField
                disabled={!isEditProfile}
                required
                fullWidth
                sx={{ mb: { xs: 3, sm: 4 } }}
                id="outlined-basic"
                type="Ваш email"
                label="Ваш email"
                variant="outlined"
                //value={email}
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                {!isEditProfile && (
                  <Button
                    fullWidth
                    startIcon={<CreateIcon />}
                    sx={{ mb: { xs: 4, sm: 6 } }}
                    variant="contained"
                    size="large"
                    onClick={handleEditProfile}
                  >
                    Редактировать
                  </Button>
                )}

                {isEditProfile && (
                  <Button
                    fullWidth
                    type="submit"
                    sx={{ mb: { xs: 4, sm: 6 } }}
                    variant="contained"
                    size="large"
                    disabled={isEmptyField}
                  >
                    Сохранить
                  </Button>
                )}
              </div>
            </div>
          </Box>

          <div>
            <Button
              fullWidth
              sx={{ mt: 5, mb: { xs: 4, sm: 6 } }}
              variant="contained"
              size="large"
              disabled={isEmptyField}
              onClick={() => {
                // должна быть ссылка на страницу изменения пароля
                navigate("/");
              }}
            >
              Изменить пароль
            </Button>
          </div>
        </Box>}
      </div>
    </div>
  );
};
