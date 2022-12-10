import React, { Component } from "react";

import QrReader from "react-qr-scanner";
import styles from "./qrCodeReader.module.scss";
import { connect } from "react-redux";

import { addAnswerFromQRCodeReader } from "../../store/reducers/questExecutionSlice";

class QRScan extends Component {
  state = {
    delay: 1500,
    result: null,
  };

  handleScan = (data) => {
    if (data != null && this.state.result === null) {
      this.setState({
        result: data ? data.text : null,
      });
      this.props.dispatch(addAnswerFromQRCodeReader(data.text));
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    const previewStyle = {
      height: 150,
      width: 150,
    };
    return (
      <div className={styles.qrBox}>
        {this.state.result == null && (
          <QrReader
            className={styles.qrBox__box}
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
          />
        )}
      </div>
    );
  }
}

export default connect()(QRScan);
