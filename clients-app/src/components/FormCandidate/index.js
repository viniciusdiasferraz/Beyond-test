import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import Skills from "../Skills/index";
import APIsCandidate from "../APIsCandidate/index";
import VersionControl from "../versionControl/index";
import TestingTools from "../TestingTools/index";
import useApi from "../../hooks/useApi";
import { useApiContext } from "../../context/context";

export default function FormCandidate() {
  const {
    handleSubmit,
    handleNameChange,
    handleExperienceChange,
  } = useApi();
  const { name, experience, isFormValid } = useApiContext();

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
            onChange={handleNameChange}
            fullWidth
            color="secondary"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          {!name && (
            <Typography variant="caption" color="error">
              Nome é obrigatório
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="experience"
            label="Experiência (em anos)"
            value={experience}
            onChange={handleExperienceChange}
            fullWidth
            color="secondary"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          {!experience && (
            <Typography variant="caption" color="error">
              Experiência é obrigatória
            </Typography>
          )}
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
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={!isFormValid}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
