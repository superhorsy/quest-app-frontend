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
                '& > :not(style)': {m: '0 auto', width: '25ch', textAlign: 'center'},
            }}
            noValidate={false}
            autoComplete="off"
            onSubmit={sendData}
        >
            <div>
                <h1>Quest App</h1>
                <TextField
                    required
                    sx={{mt: 2}}
                    id="outlined-basic"
                    label="Email"
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
                    <Link sx={{
                        display: 'block',
                        mt: 2
                    }}
                          href="#">Зарегистрируйтесь, если у вас ещё нет аккаунта
                    </Link>
                </div>
            </div>
        </Box>
    )
};
