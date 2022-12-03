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
  const [isEditProfile, setIsEditProfile] = useState(false);

  const { profile } = useSelector((state) => state.userProfileReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  const isEmptyField = !profile.nickname;

  const avatar = avatarLogo;

  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  const handleSubmitEditProfile = (event) => {
    event.preventDefault();
  };

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Мой Профиль</h1>
        <img src={avatar} className="avatar-logo" alt="avatar" />

        {profile && (
          <Box
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
                  disabled
                  fullWidth
                  sx={{ mb: { xs: 3, sm: 4 } }}
                  id="outlined-basic"
                  label="Имя"
                  variant="outlined"
                  value={profile?.first_name}
                />
                <TextField
                  disabled
                  fullWidth
                  sx={{ mb: { xs: 3, sm: 4 } }}
                  id="outlined-basic"
                  label="Фамилия"
                  variant="outlined"
                  value={profile?.last_name}
                />
                <TextField
                  disabled={!isEditProfile}
                  fullWidth
                  sx={{ mb: { xs: 3, sm: 4 } }}
                  id="outlined-basic"
                  label="Ваш Никнейм"
                  variant="outlined"
                  value={profile?.nickname}
                />
                <TextField
                  disabled
                  fullWidth
                  sx={{ mb: { xs: 3, sm: 4 } }}
                  id="outlined-basic"
                  type="Ваш email"
                  label="Ваш email"
                  variant="outlined"
                  value={profile?.email}
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
          </Box>
        )}
      </div>
    </div>
  );
};
