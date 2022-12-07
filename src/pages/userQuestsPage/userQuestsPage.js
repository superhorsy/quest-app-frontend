import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteQuest, fetchCreatedQuests} from "../../store/actions/actions";
import {useNavigate} from "react-router-dom";

import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Pagination
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import style from "./userQuestsPage.module.scss";



export const UserQuestsPage = () => {
  const dispatch = useDispatch();
  const quests = useSelector((state) => state.createdQuestsReducer.quests)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCreatedQuests())
  }, [dispatch])

  //модальное окно удаления
  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const onDeleteQuest = (questId) => {
    dispatch(deleteQuest(questId));
    setOpenDelete(false);
  };

  //модальное окно отправки квеста
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // pageAmount должно приходить с бека
  const pageAmount = Math.ceil(quests.length / 5);

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Мои квесты</h1>
        <Grid container spacing={2} sx={{maxWidth: '600px'}}>
          <List sx={{width: '100%'}}>
            {quests && quests.map((quest, idx) => (
              <ListItem
                key={idx}
                button
                className={style.listItem}
                sx={{borderBottom: '1px solid lightgray'}}
              >
                <Grid item xs={9}>
                  <ListItemText onClick={() => navigate(`/panel/create-quest/${quest.id}`)}>
                    {quest.name}
                  </ListItemText>
                </Grid>
                <Grid item xs={2}>
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="send"
                      sx={{color: "#8FBC8F"}}
                      onClick={handleClickOpen}>
                      <EmailIcon/>
                    </IconButton>
                    <IconButton
                      onClick={handleClickOpenDelete}
                      edge="end"
                      aria-label="delete"
                      sx={{color: "#F08080"}}>
                      <DeleteIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                  <Dialog open={openDelete} onClose={handleCloseDelete} sx={{backgroundColor: "rgba(0,0,0,0.4)"}}>
                    <DialogTitle>Вы уверены, что хотите удалить квест {quest.name}?</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Это действие приведет к безвозвратному удалению квеста
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDelete}>Отмена</Button>
                      <Button onClick={() => onDeleteQuest(quest.id)}>Удалить</Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog open={open} onClose={handleClose} sx={{backgroundColor: "rgba(0,0,0,0.4)"}}>
                    <DialogTitle>Отправить квест</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                                Введите имя и email вашего друга для отправки квеста на почту.
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Имя друга"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        margin="dense"
                        id="name"
                        label="Адрес почты"
                        type="email"
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Отмена</Button>
                      <Button onClick={handleClose}>Отправить</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </ListItem>
            ))}
          </List>
          {pageAmount >= 2 && <Grid item xs={12}>
            <Pagination className={style.pagination} count={pageAmount} size="small"/>
          </Grid>}

        </Grid>
      </div>
    </div>
  );
};
