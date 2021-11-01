import React from "react";
import { toast } from "react-toastify";
import { firebase } from "../../firebase";

// const useStyles = makeStyles((theme) => ({}));

export const showErrorToast = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const showSuccessToast = (msg) => {
  toast.info(msg, {
    position: toast.POSITION.TOP_LEFT,
  });
};

export const logoutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      showSuccessToast("Good bye");
    })
    .catch((error) => {
      showErrorToast(error.message);
    });
};
