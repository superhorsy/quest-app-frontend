import React from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export const StartPage = () => {
    return (
        <div className="page-container">
            <div className="temporary-header"/>

            <span className="welcomeTitle">Рады видеть вас в</span>
            <h1 className="nameOfService">Название сервиса</h1>
            <span className="welcomeText">Для полноценной работы приложения войдите в ваш аккаунт, либо зарегистрируйтесь</span>

            <div className="main-container">
                <Box
                    sx={{
                        m: '0 auto',
                        textAlign: "center",
                        // width: {xs: 8 / 10, sm: 500},
                    }}
                >

                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            // width: {xs: '100%'},
                            mb: {xs: 4, sm: 6}
                        }}
                        variant="contained"
                        size="large"
                    >Зарегистрироваться
                    </Button>
                </Box>
            </div>
        </div>
    );
};