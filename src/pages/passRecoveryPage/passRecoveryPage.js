import React, {useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export const PassRecoveryPage = () => {
    const [email, setEmail] = useState('');

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
        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: '0 auto', width: '30ch', textAlign: 'center'},
            }}
            noValidate={false}
            autoComplete="off"
            onSubmit={sendData}
        >
            <div>
                <h1>Восстановить пароль</h1>
                <TextField
                    required
                    sx={{mt: 2}}
                    id="outlined-basic"
                    label="Ваш email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                    <Button
                        type="submit"
                        sx={{mt: 2}}
                        variant="contained"
                    >Восстановить
                    </Button>
                    <div style={{marginTop: '40px'}}>
                        <span>Ещё нет аккаунта? </span>
                        <Link
                            // sx={{
                            //     display: 'block',
                            //     mt: 20
                            // }}
                            href="#">Зарегистрироваться
                        </Link>
                    </div>
                </div>
            </div>
        </Box>

    );
};