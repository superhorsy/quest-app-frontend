import React, {useState} from "react";
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
import style from "./userQuestsPage.module.scss";

const userQuests = [
  {
    id: '1',
    name: 'Квест для Маши',
  },
  {
    id: '2',
    name: 'Квест для Пети',
  },
  {
    id: '3',
    name: 'Квест для Маши, Пети, Коли  ',
  },
  {
    id: '4',
    name: 'Квест',
  },
  {
    id: '5',
    name: 'Квест для Маши, Пети, Коли, Даши и еще для много много много много много много много много кого',
  },
]

export const UserQuestsPage = () => {
  const [quests, setQuests] = useState(userQuests);
  // pageAmount должно приходить с бека
  const pageAmount = 2;

  const onDeleteQuest = (questId) => {
    setQuests(quests.filter((quest) => quest.id !== questId))
  }

  return (
    <div className="page-container">
      <div className="main-container">
        <h1 className="title">Мои квесты</h1>
        <Grid container spacing={2} sx={{maxWidth: '600px'}}>
          <List sx={{width: '100%'}}>
            {quests.map((quest) => (
              <ListItem
                key={quest.id}
                button
                className={style.listItem}
                sx={{borderBottom: '1px solid lightgray'}}
              >
                <Grid item xs={9}><ListItemText>{quest.name}</ListItemText></Grid>
                <Grid item xs={2}><ListItemSecondaryAction>
                  <IconButton aria-label="send" sx={{ color: "#8FBC8F" }}>
                    <EmailIcon/>
                  </IconButton>
                  <IconButton
                    onClick={() => onDeleteQuest(quest.id)}
                    edge="end"
                    aria-label="delete"
                    sx={{ color: "#F08080" }}>
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
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
