import React, {Component} from "react";

import {Html5QrcodeScanner} from "html5-qrcode"
import {connect} from "react-redux";

import {addAnswerFromQRCodeReader} from "../../store/reducers/questExecutionSlice";
import styles from "./qrCodeReader.module.scss";


class QRScan extends Component {
  state = {
    result: null,
  };

  qrcodeRegionId = "html5qr-code-full-region";

  handleScan = (decodedText) => {
    console.log(`Code matched = ${decodedText}`);
    if (decodedText != null && this.state.result === null) {
      this.setState({
        result: decodedText,
      });
      this.props.dispatch(addAnswerFromQRCodeReader(decodedText));
    }
  };

  componentWillUnmount() {
    this.html5QrcodeScanner.clear().catch(error => {
      console.error("Failed to clear html5QrcodeScanner. ", error);
    });
  }

  componentDidMount() {
    // Creates the configuration object for Html5QrcodeScanner.
    let config = { fps: 10, aspectRatio: 1.333334, rememberLastUsedCamera: false, };
    let verbose = false;
    this.html5QrcodeScanner = new Html5QrcodeScanner(this.qrcodeRegionId, config, verbose);
    this.html5QrcodeScanner.render(this.handleScan, undefined);
  }

  render() {
    return (
      <div className={styles.box}>
        {this.state.result == null && (
          <div id={this.qrcodeRegionId}/>
        )}
      </div>
    );
  }
}

export default connect()(QRScan);
