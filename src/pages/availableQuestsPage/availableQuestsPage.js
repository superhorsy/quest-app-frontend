import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableQuests } from "../../store/actions/actions";

import {
  ListItemText,
  List,
  ListItem,
  Container,
  Pagination,
  ListItemSecondaryAction,
  Grid,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";

import style from "./availableQuestsPage.module.scss";

export const AvailableQuestsPage = () => {
  const perPage = 10;
  const dispatch = useDispatch();
  const quests = useSelector((state) => state.questsAvailableReducer.quests);
  const totalQuests = useSelector((state) => state.questsAvailableReducer.total);
  const loading = useSelector((state) => state.questsAvailableReducer.loading);
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState({ limit: perPage, offset: 0 });
  const isVisible = true;

  useEffect(() => {
    if (!quests.length) {
      fetchData();
    }
  }, [quests]);

  function fetchData() {
    dispatch(fetchAvailableQuests(settings));
  }

  const getPages = () => {
    return Math.ceil(totalQuests / perPage)
  }
  return (
    <div className="page-container">
      <h1 className="title">Доступные квесты</h1>
      <Container maxWidth="sm">
        <Grid container spacing={2} sx={{ maxWidth: "600px" }}>
          {!loading && quests.length > 0 ? (<List sx={{ width: '100%' }}>
            {quests.map((quest) => (
              <ListItem
                key={quest.quest_id}
                button
                sx={{
                  borderBottom: "1px solid lightgray",
                  minHeight: "73px",
                }}
              >
                <Grid item xs={10}>
                  <ListItemText>{quest.quest_name}</ListItemText>
                </Grid>
                <Grid item xs={2}>
                  <ListItemSecondaryAction>
                    <CheckCircleOutlineIcon
                      edge="end"
                      sx={{ color: "#8FBC8F" }}
                      style={{ display: isVisible ? "true" : "none" }}
                    />
                  </ListItemSecondaryAction>
                </Grid>
              </ListItem>
            ))}
          </List>) : <CircularProgress disableShrink sx={{ m: "0 auto", mt: 10 }} />
          }
          {!loading && !quests.length && <p>Сожалеем, у вас пока нет доступных квестов!</p>}
          {getPages() >= 2 && (
            <Grid item xs={12}>
              <Pagination
                className={style.pagination}
                count={getPages()}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};
