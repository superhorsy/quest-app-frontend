import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableQuests } from "../../store/actions/actions";
import { questExecutionSlice } from "../../store/reducers/questExecutionSlice";

import {
  ListItemText,
  List,
  ListItem,
  Container,
  Pagination,
  Grid,
  Tooltip,
  IconButton,
  ListItemButton,
  Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';

import style from "./availableQuestsPage.module.scss";
import { useNavigate } from "react-router";

export const AvailableQuestsPage = () => {
  const perPage = 7;
  const dispatch = useDispatch();
  const quests = useSelector((state) => state.questsAvailableReducer.quests);
  const totalQuests = useSelector(
    (state) => state.questsAvailableReducer.total
  );
  const loading = useSelector((state) => state.questsAvailableReducer.loading);
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState({ limit: perPage, offset: 0 });

  const { clearStateSteps } = questExecutionSlice.actions;

  const navigate = useNavigate();

  useEffect(() => {
    if (page) {
      fetchData();
    }
    dispatch(clearStateSteps()); // Очистка стейта шагов квеста. Слайсер questExecutionSlice
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
    setSettings({
      limit: perPage,
      offset: perPage * (value - 1)
    });
  };

  function fetchData() {
    dispatch(fetchAvailableQuests(settings));
  }

  const getPages = () => {
    return Math.ceil(totalQuests / perPage);
  };

  const handleQuestStart = (questId) => {
    navigate(`/panel/quest-info/${questId}`);
  };

  const generateSecondAction = (status, owner) => {
    const statuses = {
      'not_started': {
        title: 'не начато',
        icon: <NotStartedOutlinedIcon sx={{ color: "#4E7AD2" }} />
      },
      'in_progress': {
        title: 'в процессе',
        icon: <AccessTimeIcon sx={{ color: "#FFE600" }} />
      },
      'finished': {
        title: 'завершено',
        icon: <CheckCircleOutlineIcon sx={{ color: "#31A42F" }} />
      }
    }
    return <>
      <Tooltip title={<>{'От '}<b>{owner.name}</b></>} placement="left">
        <IconButton>
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={statuses[status].title} placement="top">
        <IconButton>
          {statuses[status].icon}
        </IconButton>
      </Tooltip>
    </>;
  }

  return (
    <div className="page-container">
      <h1 className="title">Доступные квесты</h1>
      <Container maxWidth="sm">
        <Grid container spacing={2} sx={{ maxWidth: "600px" }}>
          {loading && <CircularProgress disableShrink sx={{ m: "0 auto", mt: 10 }} />}
          {(!loading && quests.length > 0) && (
            <List sx={{ width: "100%" }}>
              {quests.map((quest) => (
                <ListItem
                  disablePadding
                  key={quest.quest_id}
                  divider
                  secondaryAction={generateSecondAction(quest.status, quest.owner)}
                >
                  <ListItemButton sx={{ minHeight: "73px" }} onClick={() => handleQuestStart(quest.quest_id)}>
                    <ListItemText>{quest.quest_name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
          {!loading && !quests.length && (
            <Typography align="center" sx={{ width: "100%", mt: 2 }}>Сожалеем, у вас пока нет доступных квестов!</Typography>
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
      </Container >
    </div >
  );
};
