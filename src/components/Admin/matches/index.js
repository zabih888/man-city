import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../../Hoc/AdminLayout";
import { matchesCollection } from "../../../firebase";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { showErrorToast } from "../../Utils/tools";
import { makeStyles } from "@mui/styles";
import theme from "../../UI/Theme";

const useStyles = makeStyles((theme) => ({
  loadMoreButton: {
    marginTop: "1rem !important",
    ...theme.typography.lightButton,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.light} !important`,
    },
  },
}));

const AdminMatches = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    if (!matches) {
      setLoading(true);
      matchesCollection
        .limit(2)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const matches = snapshot.docs.map((match) => ({
            id: match.id,
            ...match.data(),
          }));
          setLastVisible(lastVisible);
          setMatches(matches);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [matches]);

  const loadMoreMatches = () => {
    if (lastVisible) {
      setLoading(true);
      matchesCollection
        .startAfter(lastVisible)
        .limit(2)
        .get()
        .then((snapshot) => {
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];
          const newMatches = snapshot.docs.map((match) => ({
            id: match.id,
            ...match.data(),
          }));
          setLastVisible(lastVisible);
          setMatches([...matches, ...newMatches]);
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      showErrorToast("nothing to load");
    }
  };

  return (
    <AdminLayout title="The Matches">
      <div style={{ marginTop: "2rem" }} />
      <Button
        variant="outlined"
        disableElevation
        component={Link}
        to={"/admin_matches/add_match"}
      >
        Add Match
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Match</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches
              ? matches.map((match, i) => (
                  <TableRow key={match.id}>
                    <TableCell>{match.date}</TableCell>
                    <TableCell
                      component={Link}
                      style={{ textDecoration: "none" }}
                      to={`/admin_matches/edit_match/${match.id}`}
                    >
                      {match.away} <strong>-</strong> {match.local}
                    </TableCell>
                    <TableCell>
                      {match.resultAway} <strong>-</strong> {match.resultLocal}
                    </TableCell>
                    <TableCell>
                      {match.final === "Yes" ? (
                        <span>Final</span>
                      ) : (
                        <span>Not played yet</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>
      <Button
        onClick={loadMoreMatches}
        variant="contained"
        className={classes.loadMoreButton}
        
      >
        LoadMore
      </Button>
      <div style={{marginBottom: "22rem"}}>{loading ? <CircularProgress thickness={7} /> : null}</div>
    </AdminLayout>
  );
};

export default AdminMatches;