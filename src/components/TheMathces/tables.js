import React, { useState, useEffect } from "react";
import { positionsCollection } from "../../firebase";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import theme from "../UI/Theme";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  tableTitle: {
    textAlign: "center",
    fontFamily: "Raleway !important",
    fontWeight: "600",
    padding: "22px",
    fontSize: "22px",
    backgroundColor: `${theme.palette.primary.main} !important`,
    borderBottom: "1px solid #01285e",
  },
  tableCellNumber: {
    color: `${theme.palette.secondary.main} !important`,
    fontFamily: "Pacifico !important",
  },
  tableCell: {
    color: `${theme.palette.secondary.main} !important`,
    fontFamily: "Raleway !important",
    fontWeight: "600 !important",
  },
}));

const LeagueTable = () => {
  const classes = useStyles();
  const [positions, setPosition] = useState(null);
  const matchesXS = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    if (!positions) {
      positionsCollection.get().then((snapshot) => {
        const positions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosition(positions);
      });
    }
  }, [positions]);

  const showTeamPositions = () =>
    positions
      ? positions.map((pos, i) => (
          <TableRow key={i}>
            <TableCell className={classes.tableCellNumber}>{i + 1}</TableCell>
            <TableCell className={classes.tableCell}>{pos.team}</TableCell>
            <TableCell className={classes.tableCellNumber}>{pos.w}</TableCell>
            <TableCell className={classes.tableCellNumber}>{pos.d}</TableCell>
            <TableCell className={classes.tableCellNumber}>{pos.l}</TableCell>
            {matchesXS ? null : (
              <TableCell className={classes.tableCellNumber}>
                {pos.pts}
              </TableCell>
            )}
          </TableRow>
        ))
      : null;

  return (
    <div className={classes.tableContainer}>
      <div className={classes.tableTitle}>League Table</div>
      <Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Pos</TableCell>
              <TableCell className={classes.tableCell}>Team</TableCell>
              <TableCell className={classes.tableCell}>W</TableCell>
              <TableCell className={classes.tableCell}>L</TableCell>
              <TableCell className={classes.tableCell}>D</TableCell>
              {matchesXS ? null : (
                <TableCell className={classes.tableCell}>Pts</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>{showTeamPositions()}</TableBody>
        </Table>
      </Grid>
    </div>
  );
};

export default LeagueTable;
