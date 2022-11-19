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
        <div className="page-container">

            <div className="temporary-header"/>

            <div className="main-container">

                <h1 className="title">Регистрация</h1>

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
                            type="email"
                            label="Ваш email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            sx={{mb: {xs: 3, sm: 4}}}
                            id="outlined-basic"
                            label="Никнейм"
                            variant="outlined"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            sx={{mb: {xs: 3, sm: 4}}}
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
                            fullWidth
                            sx={{mb: {xs: 3, sm: 4}}}
                            id="outlined-basic"
                            type="password"
                            label="Подтвердите пароль"
                            variant="outlined"
                            value={passConfirm}
                            onChange={(e) => setPassConfirm(e.target.value)}
                        />
                        <div>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{mb: {xs: 4, sm: 6}}}
                                variant="contained"
                                size="large"
                                disabled={isEmptyField() || !isPassMatched()}
                            >Зарегистрироваться
                            </Button>
                            <div>
                                <span>Уже есть аккаунт? </span>
                                <Link href="#">Войти</Link>
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};