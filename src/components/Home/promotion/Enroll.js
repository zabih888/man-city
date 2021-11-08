import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast, textErrorHelper} from "../../Utils/tools";
import { promotionsCollection } from "../../../firebase";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import theme from "../../UI/Theme";

const useStyles = makeStyles((theme) => ({
  titleEnroll: {
    color: `${theme.palette.secondary.main} !important`,
    maxWidth: "300px",
    margin: "2rem 0 2rem 0 !important",
  },
  buttonEnroll: {
    ...theme.typography.lightButton,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.light} !important`,
    },
  },
  itemEnroll: {
      marginTop: "1rem !important"
  },
  formikHandlerError: {
    color: "#DC143C	"
  }
}));

const Enroll = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("The email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = async (values) => {
    try {
      const isOnTheList = await promotionsCollection
        .where("email", "==", values.email)
        .get();

      if (isOnTheList.docs.length >= 1) {
        showErrorToast("sorry you are on the list");
        setLoading(false);
        return false;
      }
      await promotionsCollection.add({ email: values.email });
      formik.resetForm();
      setLoading(false);
      showSuccessToast("Congratulation :)");
    } catch (error) {
      showErrorToast(error);
    }
  };
  return (
    <Fade>
      <Grid container justifyContent="center" textAlign="center">
        <form component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h4" className={classes.titleEnroll}>
            Enter your email
          </Typography>
          <Grid item className={classes.itemEnroll}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              {...textErrorHelper(formik, "email")}
            />
          </Grid>
          <Grid item className={classes.itemEnroll}>
            {loading ? (
              <CircularProgress color="primary" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                className={classes.buttonEnroll}
                disabled={formik.errors.email ? true : false}
              >
                Enroll
              </Button>
            )}
          </Grid>
          <Typography
            variant="h6"
            className={classes.titleEnroll}
            style={{ fontSize: "16px", lineHeight: "1.5", textAlign: "start", color: `${theme.palette.secondary.light}`}}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without
          </Typography>
        </form>
      </Grid>
    </Fade>
  );
};

export default Enroll;
