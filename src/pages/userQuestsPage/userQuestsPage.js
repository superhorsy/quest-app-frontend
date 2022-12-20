import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuest,
  fetchCreatedQuests,
  sendQuest,
} from "../../store/actions/actions";

import { updateRecipientsInfo } from "../../store/reducers/createdQuestsSlice";

import { Loader } from "../../components/loader/loader";
import { SendQuestDialog } from "../../components/modalSendQuest";
import { DeleteQuestDialog } from "../../components/modalDeleteQuest";
import { SuccessWindow } from "../../components/sendQuestSuccessWindow/sendQuestSuccessWindow";

// UI
import {
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  //Pagination,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Badge from "@mui/material/Badge";

import style from "./userQuestsPage.module.scss";

export const UserQuestsPage = () => {
  const perPage = 5;
  const dispatch = useDispatch();
  const quests = useSelector((state) => state.createdQuestsReducer.quests);
  const totalQuests = useSelector((state) => state.createdQuestsReducer.total);
  const isLoading = useSelector(
    (state) => state.createdQuestsReducer.isLoading
  );
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState({ limit: perPage, offset: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    if (page) {
      fetchData();
    }
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
    setSettings({
      limit: perPage,
      offset: perPage * (value - 1),
    });
  };

  const fetchData = () => {
    dispatch(fetchCreatedQuests(settings));
  };

  const getPages = () => {
    return Math.ceil(totalQuests / perPage);
  };

  const isQuestsExist = quests && quests !== null;

  // модальные окна
  const [email, setEmail] = useState("");
  const [friendName, setFriendName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [questIdToSend, setQuestIdToSend] = useState("");
  const [questNameToSend, setQuestNameToSend] = useState("");
  const [formValid, setFormValid] = useState(false);
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

  const handleOpen = (questId, questName) => {
    setQuestNameToSend(questName);
    setQuestIdToSend(questId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setFriendName("");
    setEmail("");
    setIsOpen(false);
  };

  const handleSendQuest = () => {
    const data = {
      questId: questIdToSend,
      data: { email: email, name: friendName },
    };
    dispatch(sendQuest(data));
    dispatch(updateRecipientsInfo(data));
    setIsOpen(false);
    console.log("letter was send!");
  };

  const handleDeleteQuest = () => {
    dispatch(deleteQuest(questIdToDelete));
    setIsOpenDialog(false);
  };
  

  return (
    <div className="page-container">
      <SuccessWindow />
      <h1 className="title">Мои квесты</h1>
      <Container maxWidth="sm">
        <Grid container spacing={2} sx={{ maxWidth: "600px" }}>
          {isLoading && <Loader />}
          {!isLoading && isQuestsExist && (
            <List sx={{ width: "100%" }}>
              {quests &&
                quests.map((quest, idx) => (
                  <ListItem
                  
                    key={idx}
                    className={style.listItem}
                    sx={{ borderBottom: "1px solid lightgray", p:0,  }}
                  >
                    <ListItemButton sx={{ minHeight: "73px" }}>
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
                          {quest.recipients !== null && (
                            <>
                              <Tooltip
                                placement="left"
                                title={
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      textAlign: "center",
                                    }}
                                  >
                                    <em>Отправлено на email:</em>
                                    {quest.recipients.map((item, idx) => {
                                      return <em key={idx}>{item.email}</em>;
                                    })}
                                  </Box>
                                }
                              >
                                <IconButton
                                  edge="start"
                                  sx={{ color: "#bdbdbd" }}
                                >
                                  <InfoOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          {quest.recipients === null && (
                            <Tooltip
                              title="Можно отправить на разные email"
                              placement="left"
                            >
                              <IconButton
                                aria-label="send"
                                sx={{ color: "#8FBC8F" }}
                                onClick={() => handleOpen(quest.id, quest.name)}
                              >
                                <EmailOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {quest.recipients === null && (
                            <IconButton
                              onClick={() =>
                                handleDialogOpen(quest.id, quest.name)
                              }
                              edge="end"
                              aria-label="delete"
                              sx={{ color: "#F08080" }}
                            >
                              <DeleteOutlineOutlinedIcon />
                            </IconButton>
                          )}
                          {quest.recipients !== null && (
                            <Tooltip
                              title="Можно снова отправить"
                              placement="top"
                            >
                              <IconButton
                                edge="end"
                                sx={{ color: "#4E7AD2" }}
                                onClick={() => handleOpen(quest.id, quest.name)}
                              >
                                <Badge
                                  badgeContent={quest.recipients.length}
                                  color="info"
                                >
                                  <MarkEmailReadOutlinedIcon />
                                </Badge>
                              </IconButton>
                            </Tooltip>
                          )}
                        </ListItemSecondaryAction>
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          )}
          {!isLoading && quests === null && (
            <Box
              sx={{
                width: 1,
                textAlign: "center",
                fontSize: { xs: 15, sm: 20 },
              }}
            >
              У вас нет созданных квестов
            </Box>
          )}
          {getPages() >= 2 && (
            <Grid item xs={12}>
              <Pagination
                className={style.pagination}
                page={page}
                count={getPages()}
                onChange={handleChange}
                size="small"
              />
            </Grid>
          )}
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
      </Container>
    </div>
  );
};
