import React, { useState } from "react";
import { firebase } from "../../firebase";
import {
  Button,
  CircularProgress,
  Grid,
  Input,
  TextField,
} from "@mui/material";
import { Redirect } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { showErrorToast, showSuccessToast, textErrorHelper } from "../Utils/tools";
import theme from "../UI/Theme";

const useStyles = makeStyles((theme) => ({
  signInButton: {
    ...theme.typography.lightBlue,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.light} !important`,
    },
  },
}));
const SignIn = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "francis@gmail.com",
      password: "testing123",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("The email is required"),

      password: Yup.string().required("The email is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        showSuccessToast("Welcom back");
        props.history.push("./dashboard");
      })
      .catch((error) => {
        setLoading(false);
        showErrorToast(error.message);
      });
  };

  return (
    <>
      {!props.user ? (
        <Grid container>
          <Grid
            item
            container
            direction="column"
            alignItems="center"
            style={{ marginTop: "15rem" }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              onSubmit={formik.handleSubmit}
            >
              <Grid item>
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
              <Grid item>
                <TextField
                  label="Password"
                  variant="outlined"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  {...textErrorHelper(formik, "password")}
                />
              </Grid>
              <Grid item textAlign="center">
                {loading ? (
                  <CircularProgress color="primary" />
                ) : (
                  <Button
                    className={classes.signInButton}
                    fullWidth="true"
                    variant="contained"
                    type="submit"
                    disabled={ formik.errors.email || formik.errors.password ? true : false}
                  >
                    LogIn
                  </Button>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Redirect to={"/dashboard"} />
      )}
    </>
  );
};
export default SignIn;
