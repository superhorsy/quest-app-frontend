import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFinishedQuests } from "../../store/actions/actions";
import { questExecutionSlice } from "../../store/reducers/questExecutionSlice";
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';

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

import style from "./questsArchivePage.module.scss";
import { useNavigate } from "react-router";

export const QuestsArchivePage = () => {
  const perPage = 7;
  const dispatch = useDispatch();
  const quests = useSelector((state) => state.questsAvailableReducer.quests);
  const finishedQuests = useSelector((state) => state.questsAvailableReducer.finishedQuests);
  const totalQuests = useSelector(
    (state) => state.questsAvailableReducer.total
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const getPageOnload = () => {
    return searchParams.has("page") ? parseInt(searchParams.get("page")) : 1;
  }
  const [page, setPage] = useState(getPageOnload());
  const [settings, setSettings] = useState({ limit: perPage, offset: perPage * (page - 1) });
  const loading = useSelector((state) => state.questsAvailableReducer.loading);

  const { clearStateSteps } = questExecutionSlice.actions;

  const navigate = useNavigate();

  useEffect(() => {
    function fetchData() {
      dispatch(fetchFinishedQuests(settings))
    }
    if (page) {
      fetchData();
    }
    dispatch(clearStateSteps()); // Очистка стейта шагов квеста. Слайсер questExecutionSlice
  }, [page, clearStateSteps, dispatch, settings]);


  const handleChange = (event, val) => {
    event.preventDefault();
    setPage(val);
    setSettings({
      limit: perPage,
      offset: perPage * (val - 1)
    });
    setSearchParams({ "page": val })
  };

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
      <Tooltip key="owner" title={<>{'От '}<b>{owner.name}</b></>} placement="left">
        <IconButton>
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip key="status" title={statuses[status].title} placement="top">
        <IconButton>
          {statuses[status].icon}
        </IconButton>
      </Tooltip>
    </>
  }

  const CustomizedList = styled(List)`
    &{
      width: 100%
    }
    & .MuiListItem-root>.MuiListItemButton-root {
      padding-right: 96px;
      min-height: 73px;
    }
  `;

  return (
    <div className="page-container">
      <h1 className="title">Архив квестов</h1>
      <Container maxWidth="sm">
        <Grid container spacing={2} sx={{ maxWidth: "600px" }}>
          {loading && <CircularProgress disableShrink sx={{ m: "0 auto", mt: 10 }} />}
          {(!loading && quests.length > 0) && (
            <CustomizedList>
              {finishedQuests.map((quest) => (
                <ListItem
                  disablePadding
                  key={quest.quest_id}
                  divider
                  secondaryAction={generateSecondAction(quest.status, quest.owner)}
                >
                  <ListItemButton onClick={() => handleQuestStart(quest.quest_id)}>
                    <ListItemText>{quest.quest_name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </CustomizedList>
          )}
          {!loading && !quests.length && (
            <Typography align="center" sx={{ width: "100%", mt: 2 }}>Сожалеем, пока что у вас нет пройденных квестов</Typography>
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
