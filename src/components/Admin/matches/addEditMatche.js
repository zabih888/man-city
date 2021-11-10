import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
  selectErrorHelper,
  selectIsError,
} from "../../Utils/tools";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { matchesCollection, teamsCollection } from "../../../firebase";
import { makeStyles } from "@mui/styles";
import theme from "../../UI/Theme";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  addPlayerButton: {
    ...theme.typography.lightButton,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.light} !important`,
    },
  },
  matchInfoPadding: {
    marginBottom: ".8rem !important",
  },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

const defaultValues = {
  date: "",
  local: "",
  resultLocal: "",
  away: "",
  resultAway: "",
  referee: "",
  stadium: "",
  result: "",
  final: "",
};

const AddEditMatch = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [teams, setTeams] = useState(null);
  const [values, setValues] = useState(defaultValues);
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      date: Yup.string().required("This input is required"),
      local: Yup.string().required("This input is required"),
      resultLocal: Yup.number()
        .required("This input is required")
        .min(0, "The min is 0")
        .max(99, "The min is 99"),
      away: Yup.string().required("This input is required"),
      resultAway: Yup.number()
        .required("This input is required")
        .min(0, "The min is 0")
        .max(99, "The min is 99"),
      referee: Yup.string().required("This input is required"),
      stadium: Yup.string().required("This input is required"),
      result: Yup.mixed()
        .required("This input is required")
        .oneOf(["W", "D", "L", "n/a"]),
      final: Yup.mixed()
        .required("This input is required")
        .oneOf(["yes", "no"]),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const showTeams = () =>
    teams
      ? teams.map((team) => (
          <MenuItem key={team.id} value={team.shortName}>
            {team.shortName}
          </MenuItem>
        ))
      : null;

  useEffect(() => {
    if (!teams) {
      teamsCollection
        .get()
        .then((snapshot) => {
          const teams = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTeams(teams);
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  }, [teams]);

  useEffect(() => {
    const param = props.match.params.matchid;
    if (param) {
      matchesCollection
        .doc(param)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            setFormType("edit");
            setValues(snapshot.data());
          } else {
            showErrorToast("No records found");
          }
        });
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [props.match.params.matchid]);

  const submitForm = (values) => {
    let dataToSubmit = values;

    teams.forEach((team) => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit["localThmb"] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });

    setLoading(true);
    if (formType === "add") {
      matchesCollection
        .add(dataToSubmit)
        .then(() => {
          showSuccessToast("Match added :)");
          formik.resetForm();
        })
        .catch((error) => {
          showErrorToast("Sorry, something went wrong", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      matchesCollection
        .doc(props.match.prams.matchid)
        .update(dataToSubmit)
        .then(() => {
          showSuccessToast("Match Updated");
        })
        .catch((error) => {
          showErrorToast("Sorry, something went wrong", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <AdminLayout title={formType === "add" ? "Add Match" : "Edit Match"}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Typography variant="subtitle1">Select date</Typography>
            <TextField
              id="date"
              name="date"
              type="date"
              variant="outlined"
              {...formik.getFieldProps("date")}
              {...textErrorHelper(formik, "date")}
              style={{ width: matchesSM ? null : "210px" }}
              fullWidth
            />
          </div>

          <div>
            <Typography variant="subtitle1">Result local</Typography>
            <Grid
              container
              justifyContent={matchesSM ? "space-between" : undefined}
            >
              <Grid item xs={matchesSM ? "5.5" : null}>
                <FormControl error={selectIsError(formik, "local")} fullWidth>
                  <InputLabel>Team</InputLabel>
                  <Select
                    id="local"
                    name="local"
                    // label="Team"
                    variant="outlined"
                    {...formik.getFieldProps("local")}
                    style={{ width: matchesSM ? null : "210px" }}
                    input={<OutlinedInput label="Team" />}
                    MenuProps={MenuProps}
                  >
                    {showTeams()}
                  </Select>
                  {selectErrorHelper(formik, "local")}
                </FormControl>
              </Grid>
              <Grid
                item
                xs={matchesSM ? "5.5" : null}
                style={{ marginLeft: matchesSM ? undefined : "10px" }}
              >
                <TextField
                  id="resultLocal"
                  name="resultLocal"
                  type="number"
                  variant="outlined"
                  label="Result"
                  {...formik.getFieldProps("resultLocal")}
                  {...textErrorHelper(formik, "resultLocal")}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Typography variant="subtitle1">Result away</Typography>
            <Grid
              container
              justifyContent={matchesSM ? "space-between" : undefined}
            >
              <Grid item xs={matchesSM ? "5.5" : null}>
                <FormControl error={selectIsError(formik, "away")} fullWidth>
                  <InputLabel>Team</InputLabel>
                  <Select
                    id="away"
                    name="away"
                    variant="outlined"
                    label="Team"
                    {...formik.getFieldProps("away")}
                    style={{ width: matchesSM ? null : "210px" }}
                    input={<OutlinedInput label="Team" />}
                    MenuProps={MenuProps}
                  >
                    {showTeams()}
                  </Select>
                  {selectErrorHelper(formik, "away")}
                </FormControl>
              </Grid>
              <Grid
                item
                xs={matchesSM ? "5.5" : null}
                style={{ marginLeft: matchesSM ? undefined : "10px" }}
              >
                <TextField
                  id="resultAway"
                  name="resultAway"
                  type="number"
                  variant="outlined"
                  label="Result"
                  {...formik.getFieldProps("resultAway")}
                  {...textErrorHelper(formik, "resultAway")}
                />
              </Grid>
            </Grid>
          </div>

          <div>
            <Typography variant="subtitle1">Match info</Typography>
            <div className={classes.matchInfoPadding}>
              <TextField
                id="referee"
                name="referee"
                variant="outlined"
                placeholder="Add the referee name"
                {...formik.getFieldProps("referee")}
                {...textErrorHelper(formik, "referee")}
                style={{ width: matchesSM ? null : "210px" }}
                fullWidth
              />
            </div>
            <div className={classes.matchInfoPadding}>
              <TextField
                id="stadium"
                name="stadium"
                variant="outlined"
                placeholder="Add the stadium name"
                {...formik.getFieldProps("stadium")}
                {...textErrorHelper(formik, "stadium")}
                style={{ width: matchesSM ? null : "210px" }}
                fullWidth
              />
            </div>
            <div className={classes.matchInfoPadding}>
              <FormControl error={selectIsError(formik, "result")} fullWidth>
                <Select
                  id="result"
                  name="result"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("result")}
                  style={{ width: matchesSM ? null : "210px" }}
                >
                  <MenuItem value="" disabled>
                    Select a result
                  </MenuItem>
                  <MenuItem value="W">Win</MenuItem>
                  <MenuItem value="D">Draw</MenuItem>
                  <MenuItem value="L">Lose</MenuItem>
                  <MenuItem value="n/a">Non available</MenuItem>
                </Select>
                {selectErrorHelper(formik, "result")}
              </FormControl>
            </div>
            <div className={classes.matchInfoPadding}>
              <FormControl error={selectIsError(formik, "final")} fullWidth>
                <Select
                  id="final"
                  name="final"
                  variant="outlined"
                  displayEmpty
                  {...formik.getFieldProps("final")}
                  style={{ width: matchesSM ? null : "210px" }}
                >
                  <MenuItem value="" disabled>
                    Was the game played ?
                  </MenuItem>
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
                {selectErrorHelper(formik, "final")}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              className={classes.addPlayerButton}
              style={{ marginBottom: "20rem" }}
              disabled={
                formik.errors.date ||
                formik.errors.local ||
                formik.errors.resultLocal ||
                formik.errors.away ||
                formik.errors.resultAway ||
                formik.errors.referee ||
                formik.errors.stadium ||
                formik.errors.result ||
                formik.errors.final
                  ? true
                  : false
              }
            >
              {formType === "add" ? "Add match" : "Edit match"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
export default AddEditMatch;
