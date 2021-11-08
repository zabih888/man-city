import React, { Component } from "react";
import { firebase } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
import { CircularProgress } from "@mui/material";
import { Minimize } from "@mui/icons-material";

class FileUpload extends Component {
  state = {
    name: "",
    isUploading: false,
    flieURL: "",
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  };
  handleUploadError = (e) => {
    console.log(e);
    this.setState({
      isUploading: false,
    });
  };
  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({ flieURL: url });
      });

    this.props.filename(filename);
  };

  static getDerivedStateFromProps(props,state){
    if (props.defaultImag) {
      return (state = {
        name: props.defaultImagName,
        flieURL: props.defaultImag,
      });
    }
    return null;
  }

  uploadAgain = () => {
    this.setState({
      name: "",
      isUploading: false,
      flieURL: ""
    });
    this.props.restImage();
  }
  render() {
    return (
      <div>
        {!this.state.flieURL ? (
          <div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : null}
        {this.state.isUploading ? (
          <div style={{ textAlign: "center", margin: "36px 0" }}>
            <CircularProgress style={{ color: "#98c6e9" }} thickness={7} />
          </div>
        ) : null}

        {this.state.flieURL ? (
          <div>
            <img style={{ width: "100%" }} src={this.state.flieURL} />
            <div onClick={() => this.uploadAgain()}>Remove</div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default FileUpload;
