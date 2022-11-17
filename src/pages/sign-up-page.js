import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);
    const [error, setError] = useState(false);

    const sendData = (event) => {
        event.preventDefault();
        // Пока что отправляем в консоль
        console.log(
            {
                email: email,
                nickname: nickname,
                pass: pass
            }
        )
    }

    useEffect(() => {
        if (email === '' || nickname === '' || pass === '' || passConfirm === '') {
            setBtnDisable(true);
        } else if (passConfirm !== pass && passConfirm !== '') {
            setError(true);
            setBtnDisable(true);
        } else {
            setBtnDisable(false);
            setError(false);
        }
    }, [passConfirm, pass, nickname, email]);

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
                <h1>Регистрация</h1>
                <TextField
                    required
                    sx={{mt: 2}}
                    id="outlined-basic"
                    type="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    sx={{mt: 2}}
                    id="outlined-basic"
                    label="Никнейм"
                    variant="outlined"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <TextField
                    required
                    sx={{mt: 2}}
                    id="outlined-basic"
                    type="password"
                    label="Пароль"
                    variant="outlined"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <TextField
                    error={error}
                    required
                    sx={{mt: 2}}
                    id="outlined-basic"
                    type="password"
                    label="Подтвердите пароль"
                    variant="outlined"
                    value={passConfirm}
                    onChange={(e) => setPassConfirm(e.target.value)}
                />
                <div>
                    <Button
                        type="submit"
                        sx={{mt: 2}}
                        variant="contained"
                        disabled={btnDisable}
                    >Зарегистрироваться
                    </Button>
                    <Link sx={{
                        display: 'block',
                        mt: 2
                    }}
                          href="#">Войдите, если у вас уже есть аккаунт
                    </Link>
                </div>
            </div>
        </Box>
    );
};