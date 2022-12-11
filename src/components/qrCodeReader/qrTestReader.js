import React, { useState } from "react";
import QrReader from "react-qr-scanner";

export const Scanner = () => {
  const [state, setState] = useState("no result");

  const handleScan = (e) => {
    setState(e);
  };

  const handleError = (err) => {
    console.log(err);
  };

  const previewStyle = {
    height: 400,
    width: 500
    //display: "flex",
    //"justify-content": "center"
  };

  const camStyle = {
    //display: "flex",
    //justifyContent: "center"
    //marginTop: "-50px"
  };

  const textStyle = {
    fontSize: "30px"
  };

  return (
    <>
      <div>{state}</div>
      <br />
      <br />
      <br />
      <div style={camStyle}>
        <QrReader
          style={previewStyle}
          delay={100}
          onError={handleError}
          onScan={handleScan}
          facingMode={"rear"}
        />
      </div>
      <br />
    </>
  );
};

