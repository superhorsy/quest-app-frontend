import React from "react";
//import QRScan from "../../../../components/qrCodeReader/qrCodeReader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {QrCodeScanner} from "../../../../components/qrCodeReader/html5QrCode";

export const QRStep = ({ qrCodeAnswer }) => {
  const { success } = useSelector((state) => state.questExecutionReducer);
  const [toggleScanQR, setToggleScanQR] = useState(true);
  useEffect(() => {
    if (!success) {
      setToggleScanQR(true);
    }
  }, []);
  return (
    <>
      {qrCodeAnswer && <Typography sx={{textAlign: "center", fontSize: "14px"}}>{qrCodeAnswer}</Typography>}
      {/*{!toggleScanQR && !qrCodeAnswer && <QRScan success={success}/>}*/}
      {!toggleScanQR && !qrCodeAnswer && <QrCodeScanner success={success}/>}
      {toggleScanQR && (
        <Button onClick={() => setToggleScanQR(false)}>
          Отсканировать QR-код
        </Button>
      )}
    </>
  );
};
