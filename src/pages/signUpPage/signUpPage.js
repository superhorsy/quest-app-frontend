import React, {useMemo, useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

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

    /** Функция для проверки на пустые поля.
     * @returns {boolean} Возвращает true если хоть одно поле пустое
     */
    const isEmptyField = () => {
        return !email || !nickname || !pass || !passConfirm;
    }

    /** Функция для проверки подтверждения пароля.
     * @returns {boolean} Возвращает true если пароль совпадает
     */
    const isPassMatched = () => {
        return passConfirm === pass;
    }

    // const isEmptyField = useMemo(
    //     () => !email || !nickname || !pass || !passConfirm,
    //     [passConfirm, pass, nickname, email]
    // )
    //
    // const isPassMatched = useMemo(
    //     () => passConfirm === pass,
    //     [passConfirm, pass]
    // )

    // useEffect(() => {
    //     console.log('отработал юзэфеект')
    //     if (!email || !nickname || !pass || !passConfirm) {
    //         // setBtnDisable(true);
    //         console.log('отработал if');
    //     } else if (passConfirm !== pass && passConfirm) {
    //         setError(true);
    //         setBtnDisable(true);
    //         console.log('отработал else if');
    //     } else {
    //         setBtnDisable(false);
    //         setError(false);
    //         console.log('отработал else');
    //     }
    // }, [passConfirm, pass, nickname, email]);

    console.log('рендер');

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
                <h1>Регистрация</h1>
                <TextField
                    required
                    sx={{mt: 2, width: '100%'}}
                    id="outlined-basic"
                    type="email"
                    label="Ваш email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    sx={{mt: 2, width: '100%'}}
                    id="outlined-basic"
                    label="Никнейм"
                    variant="outlined"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <TextField
                    required
                    sx={{mt: 2, width: '100%'}}
                    id="outlined-basic"
                    type="password"
                    label="Пароль"
                    variant="outlined"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <TextField
                    error={!isPassMatched() && Boolean(passConfirm)}
                    required
                    sx={{mt: 2, width: '100%'}}
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
                        sx={{mt: 2, width: '100%'}}
                        variant="contained"
                        disabled={isEmptyField() || !isPassMatched()}
                    >Зарегистрироваться
                    </Button>
                    <div style={{marginTop: '40px'}}>
                        <span>Уже есть аккаунт? </span>
                        <Link
                            // sx={{
                            //     display: 'block',
                            //     mt: 2
                            // }}
                            href="#">Войти
                        </Link>
                    </div>
                </div>
            </div>
        </Box>
    );
};