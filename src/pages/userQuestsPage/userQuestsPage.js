import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { deleteQuest, fetchCreatedQuests, sendQuest } from "../../store/actions/actions";

import { Loader } from "../../components/loader/loader";
import { SendQuestDialog } from "../../components/modalSendQuest"
import { DeleteQuestDialog } from "../../components/modalDeleteQuest";

// UI
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

import style from "./userQuestsPage.module.scss";

export const UserQuestsPage = () => {
  const dispatch = useDispatch();
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
  const [emailError, setEmailError] = useState("");
  const [questIdToSend, setQuestIdToSend] = useState("");
  const [questNameToSend, setQuestNameToSend] = useState("");
  const [formValid, setFormValid] = useState(false)
  const [questIdToDelete, setQuestIdToDelete] = useState("");
  const [questNameToDelete, setQuestNameToDelete] = useState("");

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

  const handleOpen = (questId, questName ) => {
    setQuestNameToSend(questName);
    setQuestIdToSend(questId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setFriendName("")
    setEmail("")
    setIsOpen(false);
  };

  const handleSendQuest = () => {
    const data = {questId: questIdToSend, data: {email: email, name: friendName}}
    dispatch(sendQuest(data));
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
        {isLoading && <Loader/>}
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
                emailError={emailError}
                setEmailError={setEmailError}
                questNameToSend={questNameToSend}
                formValid={formValid}
                setFormValid={setFormValid}
                handleSendQuest={handleSendQuest}
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
