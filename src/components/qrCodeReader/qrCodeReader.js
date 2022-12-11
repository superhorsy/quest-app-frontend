import React, { Component } from "react";

import QrReader from "react-qr-scanner";
import styles from "./qrCodeReader.module.scss";

class QRScan extends Component {
  state = {
    delay: 1000,
    result: null,
  };

  handleScan = (data) => {
    if (data != null && this.state.result === null) {
      this.setState({
        result: data ? data.text : null,
      });
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    const previewStyle = {
      height: 150,
      width: 150,
    }
    return (
      <div className={styles.qrBox}>
        {this.state.result == null && (
          <QrReader
            legacyMode = {true}
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
          />
        )}
        <p className={styles.qrBox__desc}>{this.state.result}</p>
      </div>
    );
  }
}

export default QRScan;
