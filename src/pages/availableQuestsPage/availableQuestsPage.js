import React from "react";
import {
    ListItemText,
    List,
    ListItem,
    Container,
    Pagination,
    ListItemSecondaryAction,
    Grid,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import style from "./availableQuestsPage.module.scss";

const availableQuests = [
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
        name: 'Квест для Маши, Пети, Коли, Даши ',
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

export const AvailableQuestsPage = () => {

    const isVisible = true;

    return (
        <div className="page-container">
            <div className="main-container">
                <h1 className="title">Доступные квесты</h1>
                <Container maxWidth="sm">
                    <Grid container spacing={1}>
                        <List>
                            {availableQuests.map((quest) => (
                                <ListItem
                                    key={quest.id}
                                    button
                                    sx={{borderBottom: '1px solid lightgray', minHeight: '73px'}}>
                                    <Grid item xs={10}>
                                        <ListItemText>{quest.name}</ListItemText>
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
