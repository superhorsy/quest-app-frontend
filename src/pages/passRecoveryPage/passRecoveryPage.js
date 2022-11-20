import React, {useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export const PassRecoveryPage = () => {
    const [email, setEmail] = useState('');

    // const isEmptyField = () => {
    //     return !email;
    // }

    const isEmptyField = !email;

    const sendData = (event) => {
        event.preventDefault();
        // Пока что отправляем в консоль
        console.log(
            {
                email: email
            }
        )
    }

    return (
        <div className="page-container">
            <div className="temporary-header"/>
            <div className="main-container">
                <h1 className="title">Восстановить пароль</h1>
                <Box
                    component="form"
                    sx={{
                        m: '0 auto',
                        textAlign: "center",
                        width: {xs: 1 / 1, sm: 500},
                    }}
                    noValidate={false}
                    autoComplete="off"
                    onSubmit={sendData}
                >
                    <div>
                        <TextField
                            required
                            fullWidth
                            sx={{mb: {xs: 3, sm: 4}}}
                            id="outlined-basic"
                            label="Ваш email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{mb: {xs: 4, sm: 6}}}
                                size="large"
                                variant="contained"
                                disabled={isEmptyField}
                            >Восстановить
                            </Button>
                            <div>
                                <span>Ещё нет аккаунта? </span>
                                <Link href="#">Зарегистрироваться</Link>
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};