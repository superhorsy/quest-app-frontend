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

    useEffect(() => {
        const Html5QrCode = new Html5Qrcode("reader");
        Html5QrCode.start(
            // devices[1].id,
            {facingMode: {exact: "environment"}},
            // {deviceId: {exact: devices[0].id}},
            config,
            (decodedText, decodedResult) => {
                if (decodedText != null && result === null) {
                    setResult(decodedText)
                    dispatch(addAnswerFromQRCodeReader(decodedText));
                }
            },
            (errorMessage) => {
                console.log("Error on scan", errorMessage)
            })
            .catch((error) => {
                console.log("ERROR", error)
            })
    }, [])

    return (
        <div className={styles.box}>
            {console.log("render", result)}
            {result == null && (
                <div id={"reader"}/>
            )}
        </div>
    );
};