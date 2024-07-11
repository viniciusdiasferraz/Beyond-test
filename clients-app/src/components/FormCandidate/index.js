import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import Skills from "../Skills/index";
import APIsCandidate from "../APIsCadidate/index";
import VersionControl from "../versionControl/index";
import TestingTools from "../TestingTools/index";
import useApi from "../../hooks/useApi";
import { useApiContext } from "../../context/context";

export default function FormCandidate() {
  const { handleSubmit } = useApi();
  const { name, experience, setName, setExperience } = useApiContext();

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="experience"
            label="Experiência (em anos)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Skills />
        </Grid>
        <Grid item xs={6}>
          <APIsCandidate />
        </Grid>
        <Grid item xs={6}>
          <VersionControl />
        </Grid>
        <Grid item xs={6}>
          <TestingTools />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
