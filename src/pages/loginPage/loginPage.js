import React, {useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const sendData = (event) => {
        event.preventDefault();
        // Пока что отправляем в консоль
        console.log(
            {
                email: email,
                pass: pass
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
                <h1>Авторизация</h1>
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
                <TextField
                    required
                    sx={{mt: 2}}
                    id="outlined-basic"
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <Link sx={{
                    display: 'block',
                    textAlign: 'right',
                    mt: 2
                }}
                      href="#">Забыли пароль?
                </Link>
                <div>
                    <Button
                        type="submit"
                        sx={{mt: 2}}
                        variant="contained"
                    >Войти
                    </Button>
                    <div style={{marginTop: '40px'}}>
                        <span>Ещё нет аккаунта? </span>
                        <Link
                            // sx={{
                            //     display: 'block',
                            //     mt: 2
                            // }}
                            href="#">Зарегистрироваться
                        </Link>
                    </div>
                </div>
            </div>
        </Box>
    )
};
