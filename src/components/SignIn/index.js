import React, { useState } from "react";
import { firebase } from "../../firebase";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Redirect } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import {
  selectIsError,
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
} from "../Utils/tools";
import theme from "../UI/Theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("The email is required"),

      password: Yup.string().required("The password is required"),
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
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
            style={{ margin: "17rem 0" }}
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
                  {...formik.getFieldProps("email")}
                  {...textErrorHelper(formik, "email")}
                />
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <InputLabel error={selectIsError(formik, "password")}>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                    {...textErrorHelper(formik, "password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  ></OutlinedInput>
                  {formik.errors.password && formik.touched.password ? (
                    <div
                      style={{
                        color: "#d32f2f",
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        lineHeight: 1.66,
                        fontFamily: "Roboto",
                        padding: "3px 14px 0 14px",
                        textAlign: "left"
                      }}
                    >
                      The password is required
                    </div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item textAlign="center">
                {loading ? (
                  <CircularProgress color="primary" />
                ) : (
                  <>
                  <Button
                    className={classes.signInButton}
                    fullWidth="true"
                    variant="contained"
                    type="submit"
                    disabled={
                      formik.errors.email || formik.errors.password
                        ? true
                        : false
                    }
                  >
                    LogIn
                  </Button>
                 
                  </>
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