import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  selectErrorHelper,
  selectIsError,
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
} from "../../Utils/tools";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { playersCollection, firebase } from "../../../firebase";
import { makeStyles } from "@mui/styles";
import theme from "../../UI/Theme";

const useStyles = makeStyles({
  addPlayerButton: {
    ...theme.typography.lightButton,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.light} !important`,
    },
  },
});
const defaultValues = {
  name: "",
  lastName: "",
  number: "",
  position: "",
};

const AddEditPlayers = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(defaultValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      lastName: Yup.string().required("This input is required"),
      number: Yup.number()
        .required("This input is required")
        .min(0, "This min is zero")
        .max(100, "This max is 100"),
      position: Yup.string().required("This input is required"),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    let dataToSubmit = values;
    setLoading(true);
    if (formType === "add") {
      playersCollection
        .add(dataToSubmit)
        .then(() => {
          showSuccessToast("Player added");
          formik.resetForm();
          props.history.push("/admin_players");
        })
        .catch((error) => {
          showErrorToast(error);
        });
    } else {
      // formType === edit
      playersCollection
        .doc(props.match.params.playerid)
        .update(dataToSubmit)
        .then(() => {
          showSuccessToast("Player updated");
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const param = props.match.params.playerid;
    if (param) {
      playersCollection
        .doc(param)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            setFormType("edit");
            setValues(snapshot.data());
          } else {
            showErrorToast("Sorry, nothing was found");
          }
        })
        .catch((error) => {
          showErrorToast(error);
        });
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [props.match.params.playerid]);

  return (
    <AdminLayout title={formType === "add" ? "Add players" : "Edit players"}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <hr />
          <h4>Player info</h4>
          <Grid container direction="column" gap={1.5}>
            <div>
              <TextField
                id="name"
                name="name"
                variant="outlined"
                label="Add name"
                {...formik.getFieldProps("name")}
                {...textErrorHelper(formik, "name")}
              />
            </div>
            <div>
              <TextField
                id="lastName"
                name="lastName"
                variant="outlined"
                label="Add lastName"
                {...formik.getFieldProps("lastName")}
                {...textErrorHelper(formik, "lastName")}
              />
            </div>
            <div>
              <TextField
                id="number"
                name="number"
                variant="outlined"
                label="Add number"
                type="number"
                {...formik.getFieldProps("number")}
                {...textErrorHelper(formik, "number")}
              />
            </div>
            <FormControl error={selectIsError(formik, "position")}>
              <InputLabel>Selected</InputLabel>
              <Select
                style={{ width: "210px"}}
                id="position"
                name="position"
                variant="outlined"
                label="Selected"
                displayEmpty
                placeholder="Add position"
                {...formik.getFieldProps("position")}
              >
                <MenuItem value="Keeper">Keeper</MenuItem>
                <MenuItem value="Defence">Defence</MenuItem>
                <MenuItem value="Midfield">Midfield</MenuItem>
                <MenuItem value="Striker">Striker</MenuItem>
              </Select>
              {selectErrorHelper(formik, "position")}
            </FormControl>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className={classes.addPlayerButton}
            style={{ marginTop: "1rem" , marginBottom: "20rem"}}
            disabled={
              formik.errors.name ||
              formik.errors.lastName ||
              formik.errors.number ||
              formik.errors.position
                ? true
                : false
            }
          >
            {formType === "add" ? "Add player" : "Edit player"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddEditPlayers;
