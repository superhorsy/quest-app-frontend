import React, {useEffect, useState} from 'react';
import {Html5Qrcode, Html5QrcodeScanner} from "html5-qrcode";
import styles from "./html5QrCode.module.scss";
import {addAnswerFromQRCodeReader} from "../../store/reducers/questExecutionSlice";
import {useDispatch} from "react-redux";

export const QrCodeScanner = () => {
    const [result, setResult] = useState(null);
    const qrcodeRegionId = "html5qr-code-full-region";
    const dispatch = useDispatch();

    let config = {
        fps: 10,
        aspectRatio: 1.333334,
        // qrbox: {width: 350, height: 350},
        rememberLastUsedCamera: false
    };

    const qrCodeSuccessCallback = (html5QrCode) => (decodedText, decodedResult) => {
        if (decodedText != null && result === null) {
            setResult(decodedText)
            dispatch(addAnswerFromQRCodeReader(decodedText));
            html5QrCode.stop()
                .then((ignore) => {
                })
                .catch((error) => {
                })
        }
    }

    const qrCodeErrorCallback = (errorMessage) => {
        //console.log("Error on scan", errorMessage)
    }

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");

        html5QrCode.start(
            // devices[1].id,
            {facingMode: {exact: "environment"}},
            // {deviceId: {exact: devices[0].id}},
            config,
            qrCodeSuccessCallback(html5QrCode),
            qrCodeErrorCallback
        )
            .catch((error) => {
                console.log("На вашем устройстве нет задней камеры", error)
                html5QrCode.start(
                    {facingMode: {exact: "user"}},
                    config,
                    qrCodeSuccessCallback(html5QrCode),
                    qrCodeErrorCallback
                )
                    .catch((error) => console.log("На вашем устройстве нет фронтальной камеры", error))
            })
    }, [])

    return (
        <div className={styles.box}>
            {result == null && (
                <div id={"reader"}/>
            )}
        </div>
    );
};