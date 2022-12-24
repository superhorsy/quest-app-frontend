import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuest, getQuestStatus } from "../store/actions/actions";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";

export const QuestInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questId } = useParams();
  const quest = useSelector((state) => state.currentQuestReducer.currentQuest);
  const status = useSelector((state) => state.currentQuestReducer.status);
  const loading = useSelector((state) => state.currentQuestReducer.isLoading);
  const statuses = {
    'not_started': {
      title: 'не начато',
      btn: 'Начать квест',
      color: '#4E7AD2'
    },
    'in_progress': {
      title: 'в процессе',
      btn: 'Продолжить прохождение',
      color: '#FFE600'
    },
    'finished': {
      title: 'завершено',
      btn: false,
      color: '#31A42F'
    }
  }
  useEffect(() => {
    if (quest.id !== questId) {
      dispatch(fetchQuest(questId));
      dispatch(getQuestStatus(questId));
    }
  }, [quest, dispatch, questId]);

  const handleQuestStart = () => {
    navigate(`/questExecution_decorated/${questId}`);
  };

  return <div className="page-container">
    <Container maxWidth="sm">
      <Grid container spacing={2} sx={{ maxWidth: "600px" }}>
        {loading && <CircularProgress disableShrink sx={{ m: "0 auto", mt: 10 }} />}
        {(!loading && quest) && (
          <>
            <h1 className="title">{quest.name}</h1>
            <Typography align="left" sx={{ width: "100%", mt: 2 }}>{quest.description}</Typography>
            {status &&
              <>
                <Typography align="left" sx={{ width: "100%", mt: 2, fontWeight: '600' }}>Статус: <Box component="span" sx={{ color: statuses[status].color }}>{statuses[status].title}</Box></Typography>
                {statuses[status].btn &&
                  <Button onClick={handleQuestStart} sx={{ m: "0 auto", mt: 6 }} size="large" variant="contained">{statuses[status].btn}</Button>
                }
              </>
            }
          </>
        )}
      </Grid>
    </Container >
  </div >;
};