import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  TextField,
  Button,
  Avatar
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { ModalRestorePass } from "../../components/modalResorePass";
import { Loader } from "../../components/loader/loader";
import { fetchUserProfile, updateUserProfile } from "../../store/actions/actions";

export const UserProfile = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);

  const { profile } = useSelector((state) => state.userProfileReducer);
  const { isLoading } = useSelector((state) => state.userProfileReducer);


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
    setFirstName(profile?.first_name);
    setLastName(profile?.last_name);
    setNickName(profile?.nickname);
  }, [dispatch]);

  const isEmptyField = !firstName || !lastName || !nickName;


  const handleEditProfile = () => {
    setIsEditProfile(!isEditProfile);
  };

  const handleSubmitEditProfile = (event) => {
    event.preventDefault();
    const newProfile = {
      first_name: firstName,
      last_name: lastName,
      nickname: nickName
    }
    dispatch(updateUserProfile(newProfile));
    setIsEditProfile(!isEditProfile);
  };

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Мой Профиль</h1>
        {isLoading && <Loader />}

        {!isLoading && profile && (
          <>
            <Box
              component="div"
              sx={{
                m: "0 auto",
                textAlign: "center",
                width: { xs: 1 / 1, sm: 500 },
              }}
            >
              <Avatar sx={{ fontSize: '32px', width: '110px', height: '110px', m: 'auto', mb: 5 }} alt="User" src=''>{profile?.first_name[0].toUpperCase()}{profile?.last_name[0].toUpperCase()}</Avatar>
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
                    fullWidth
                    sx={{ mb: { xs: 3, sm: 4 } }}
                    id="outlined-basic-name"
                    label="Имя"
                    variant="outlined"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                  <TextField
                    disabled={!isEditProfile}
                    fullWidth
                    sx={{ mb: { xs: 3, sm: 4 } }}
                    id="outlined-basic-lastNmae"
                    label="Фамилия"
                    variant="outlined"
                    onChange = {(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                  <TextField
                    disabled={!isEditProfile}
                    fullWidth
                    sx={{ mb: { xs: 3, sm: 4 } }}
                    id="outlined-basic-nick"
                    label="Ваш Никнейм"
                    variant="outlined"
                    onChange = {(e) => setNickName(e.target.value)}
                    value={nickName}
                  />
                  <TextField
                    disabled
                    fullWidth
                    sx={{ mb: { xs: 3, sm: 4 } }}
                    id="outlined-basic-email"
                    type="email"
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
                <ModalRestorePass
                  disabled={isEmptyField}
                  fullWidth={true}
                  variant="contained"
                  size="large"
                />
              </div>
            </Box>
          </>
        )}
      </div>
    </div>
  );
};
