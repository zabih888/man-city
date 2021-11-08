import { FormHelperText } from "@mui/material";
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

export const textErrorHelper = (formik, values) => ({
  error: formik.errors[values] && formik.touched[values],
  helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null,
});

export const selectErrorHelper = (formik, values) => {
  if (formik.errors[values] && formik.touched[values]) {
    return <FormHelperText>{formik.errors[values]}</FormHelperText>;
  }
  return false;
};

export const selectIsError = (formik, values) => {
  return formik.errors[values] && formik.touched[values];
};
