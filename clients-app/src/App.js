import React from "react";
import { Grid, Paper, Box } from "@mui/material";
import Modal from "./components/Modal";
import FormCandidate from "./components/FormCandidate/index";
import ListCandidates from "./components/ListCandidates";

function App() {
  return (
    <Box>
      <Grid container spacing={10} p={5}>
        <Grid item xs={12} sm={5}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#f0f0f0",
              minWidth: "100%",
            }}
          >
            <FormCandidate />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={7}>
          <Paper
            sx={{ p: 2, borderRadius: 2, bgcolor: "#f0f0f0", minWidth: "100%" }}
          >
            <ListCandidates />
          </Paper>
        </Grid>
      </Grid>
      <Modal />
    </Box>
  );
}

export default App;
