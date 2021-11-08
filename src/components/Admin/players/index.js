import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../../Hoc/AdminLayout";
import { playersCollection } from "../../../firebase";
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

const AdminPlayers = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    if(!players){
      setLoading(true)
      playersCollection.limit(2).get().then(snapshot => {
        const lastVisible = snapshot.docs[snapshot.docs.length - 1]
        const players = snapshot.docs.map(player => ({
          id: player.id,
          ...player.data()
        }))
        setLastVisible(lastVisible)
        setPlayers(players)
      }).catch(error => {
        showErrorToast(error)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [players])

  const loadMorePlayers = () => {
    if(lastVisible){
      setLoading(true)
      playersCollection.startAfter(lastVisible).limit(2).get().then(snapshot => {
        const lastVisible = snapshot.docs[snapshot.docs.length - 1 ]
        const newPlayers = snapshot.docs.map(player => ({
          id: player.id,
          ...player.data()
        }))
        setLastVisible(lastVisible)
        setPlayers([...players, ...newPlayers])
      }).catch(error => {
        showErrorToast(error)
      }).finally(() => {
        setLoading(false)
      })
    }else{
      showErrorToast("nothing to load")
    }
  }

  return(
    <AdminLayout title="The Players"> 
      <div style={{marginTop: "2rem"}} />
      <Button variant="outlined" disableElevation component={Link} to={"/admin_players/add_player"} >Add Player</Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Frist Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players ?
              players.map((player , i) => (
                <TableRow key={player.id}>
                  <TableCell
                    component={Link}
                    style={{textDecoration: "none"}}
                    to={`/admin_players/edit_player/${player.id}`}
                  >{player.name}
                  </TableCell>
                  <TableCell
                    component={Link}
                    style={{textDecoration: "none"}}
                    to={`/admin_players/edit_player/${player.id}`}
                  >{player.lastName}
                  </TableCell>
                  <TableCell>
                    {player.number}
                  </TableCell>
                  <TableCell>
                    {player.position}
                  </TableCell>
                </TableRow>
              ))
            : null}
          </TableBody>
        </Table>
      </Paper>
      <Button onClick={loadMorePlayers} variant="contained" className={classes.loadMoreButton}>LoadMore</Button>
      <div>{loading ? <CircularProgress thickness={7} /> : null}</div>
    </AdminLayout>
  )
}

export default AdminPlayers;