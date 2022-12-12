import React from "react";
import QRScan from "../../../../components/qrCodeReader/qrCodeReader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

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
      {qrCodeAnswer && <Typography variant="h6" sx={{textAlign: "center"}}>{qrCodeAnswer}</Typography>}
      {!toggleScanQR && !qrCodeAnswer && <QRScan success={success}/>}
      {toggleScanQR && (
        <Button onClick={() => setToggleScanQR(false)}>
          Отсканировать QR-код
        </Button>
      )}
    </>
  );
};
