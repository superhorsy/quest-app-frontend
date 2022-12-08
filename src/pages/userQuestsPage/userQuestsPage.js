import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuest, fetchCreatedQuests } from "../../store/actions/actions";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  // Pagination,
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
import CircularProgress from "@mui/material/CircularProgress";

const SendQuestDialog = ({
  isOpen,
  handleClose,
  questNameToSend,
  handleAction,
  friendName,
  setFriendName,
  email,
  setEmail,
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Отправить квест: {questNameToSend}</DialogTitle>
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
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Адрес почты"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Отмена</Button>
        <Button onClick={() => handleAction()}>Отправить</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteQuestDialog = ({
  isOpenDialog,
  handleClose,
  questNameToDelete,
  handleAction,
}) => {
  return (
    <Dialog open={() => isOpenDialog} onClose={() => handleClose()}>
      <DialogTitle>
        Вы уверены, что хотите удалить квест {questNameToDelete}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Это действие приведет к безвозвратному удалению квеста
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Отмена</Button>
        <Button onClick={() => handleAction()}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
};

export const UserQuestsPage = () => {
  const dispatch = useDispatch();
  console.log("quests", quests);
  const navigate = useNavigate();
  const quests = useSelector((state) => state.createdQuestsReducer.quests);
  const isLoading = useSelector(
    (state) => state.createdQuestsReducer.isLoading
  );

  const isQuestsExist = quests && quests !== null;

  useEffect(() => {
    dispatch(fetchCreatedQuests());
  }, [dispatch]);

  // модальные окна
  const [email, setEmail] = useState("");
  const [friendName, setFriendName] = useState("");
  const [questIdToSend, setQuestIdToSend] = useState("");
  const [questNameToSend, setQuestNameToSend] = useState("");
  const [questIdToDelete, setQuestIdToDelete] = useState("");
  const [questNameToDelete, setQuestNameToDelete] = useState("");

  // reusable modal

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleDialogOpen = (questId, questName) => {
    setQuestNameToDelete(questName);
    setQuestIdToDelete(questId);
    setIsOpenDialog(true);
  };

  const handleDialogClose = () => {
    setIsOpenDialog(false);
  };

  const handleOpen = (questId, questName, ) => {
    setQuestNameToSend(questName);
    setQuestIdToSend(questId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const handleSendQuest = () => {
    console.log("quest was send", questIdToSend, friendName, email);
    setIsOpen(false);
  };

  const handleDeleteQuest = () => {
    dispatch(deleteQuest(questIdToDelete));
    setIsOpenDialog(false);
  };

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Мои квесты</h1>
        {isLoading && (
          <CircularProgress disableShrink sx={{ m: "0 auto", mt: 10 }} />
        )}
        {!isLoading && quests === null && (
          <div>У вас нет созданных квестов</div>
        )}
        {!isLoading && isQuestsExist && (
          <>
            <Grid container spacing={2} sx={{ maxWidth: "600px" }}>
              <List sx={{ width: "100%" }}>
                {quests &&
                  quests.map((quest, idx) => (
                    <ListItem
                      key={idx}
                      button
                      className={style.listItem}
                      sx={{ borderBottom: "1px solid lightgray" }}
                    >
                      <Grid item xs={9}>
                        <ListItemText
                          onClick={() =>
                            navigate(`/panel/quest-profile/${quest.id}`)
                          }
                        >
                          {quest.name}
                        </ListItemText>
                      </Grid>
                      <Grid item xs={2}>
                        <ListItemSecondaryAction>
                          <IconButton
                            aria-label="send"
                            sx={{ color: "#8FBC8F" }}
                            onClick={() => handleOpen(quest.id, quest.name)}
                          >
                            <EmailIcon />
                          </IconButton>

                          <IconButton
                            onClick={() =>
                              handleDialogOpen(quest.id, quest.name)
                            }
                            edge="end"
                            aria-label="delete"
                            sx={{ color: "#F08080" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </Grid>
                    </ListItem>
                  ))}
              </List>

              {/* {pageAmount >= 2 && <Grid item xs={12}>
                <Pagination className={style.pagination} count={pageAmount} size="small"/>
              </Grid>} */}
            </Grid>
            {isOpen && (
              <SendQuestDialog
                isOpen={isOpen}
                handleClose={handleClose}
                email={email}
                setEmail={setEmail}
                friendName={friendName}
                setFriendName={setFriendName}
                questNameToSend={questNameToSend}
                handleAction={handleSendQuest}
              />
            )}
            {isOpenDialog && (
              <DeleteQuestDialog
                isOpenDialog={isOpenDialog}
                handleClose={handleDialogClose}
                questNameToDelete={questNameToDelete}
                handleAction={handleDeleteQuest}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
