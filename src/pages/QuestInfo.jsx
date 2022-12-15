import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuest, fetchUserProfile } from "../store/actions/actions";
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
  const [status, setStatus] = useState({});
  const { questId } = useParams();
  const quest = useSelector(
    (state) => state.currentQuestReducer.currentQuest
  );
  const { profile } = useSelector((state) => state.userProfileReducer);
  const loading = useSelector((state) => state.currentQuestReducer.isLoading);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile());
    }
    if (quest.id !== questId) {
      dispatch(fetchQuest(questId));
    }
    if (quest && profile) {
      setStatus(getQuestStatus(quest.recipients));
    }
  }, [quest, profile]);

  const handleQuestStart = () => {
    navigate(`/questExecution_decorated/${questId}`);
  };

  const getQuestStatus = (recipients) => {
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
    if (recipients) {
      const currUserQuestInfo = recipients.find((user) => user.email === profile.email);
      return statuses[currUserQuestInfo.status];
    }
  }
  return <div className="page-container">
    <h1 className="title">{quest.name}</h1>
    <Container maxWidth="sm">
      <Grid container spacing={2} sx={{ maxWidth: "600px" }}>
        {loading && <CircularProgress disableShrink sx={{ m: "0 auto", mt: 10 }} />}
        {(!loading && quest) && (
          <>
            <Typography align="left" sx={{ width: "100%", mt: 2 }}>{quest.description}</Typography>
            {status &&
              <>
                <Typography align="left" sx={{ width: "100%", mt: 2, fontWeight: '600' }}>Статус: <Box component="span" sx={{ color: status.color }}>{status.title}</Box></Typography>
                {status.btn &&
                  <Button onClick={handleQuestStart} sx={{ m: "0 auto", mt: 6 }} size="large" variant="contained">{status.btn}</Button>
                }
              </>
            }
          </>
        )}
      </Grid>
    </Container >
  </div >;
};