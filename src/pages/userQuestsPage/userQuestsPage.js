import React from "react";
import {
    Container,
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
        name: 'Квест Квест для Маши, Пети, Коли, Даши и еще для многомногомного многомного много много много кого',
    },
    {
        id: '4',
        name: 'Квест',
    },
    {
        id: '5',
        name: 'Квест для Маши, Пети, Коли, Даши и еще для многомногомногомногомного много много много кого',
    },
]

export const UserQuestsPage = () => {
    return (
        <div className="page-container">
            <div className="main-container">
                <h1 className="title">Мои квесты</h1>
                <Container maxWidth="sm">
                    <Grid container spacing={1}>
                        <List>
                            {userQuests.map((quest) => (
                                <ListItem
                                    key={quest.id}
                                    button
                                >
                                    <Grid item xs={10}><ListItemText>{quest.name}</ListItemText></Grid>
                                    <Grid item xs={2}><ListItemSecondaryAction>
                                        <IconButton aria-label="send">
                                            <EmailIcon/>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                        <Grid item xs={12}>
                            <Pagination className={style.pagination} count={10} size="small"/>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
};
