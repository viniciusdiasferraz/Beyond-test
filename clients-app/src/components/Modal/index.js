import React, { useEffect } from "react";
import {
  Button,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import useApi from "../../hooks/useApi";
import { useApiContext } from "../../context/context";
import Skills from "../Skills/index";
import APIsCandidate from "../APIsCandidate/index";
import VersionControl from "../versionControl/index";
import TestingTools from "../TestingTools/index";

export default function Modal() {
  const { handleDelete, handleClose, handleEdit } = useApi();
  const {
    selectUser,
    open,
    selectedName,
    selectedExperience,
    setSelectedName,
    setSelectedExperience,
    setSelectedSkills,
    setSelectedApis,
    setSelectedVersionControl,
    setSelectedTestingTools,
  } = useApiContext();

  useEffect(() => {
    if (selectUser) {
      setSelectedName(selectUser.name);
      setSelectedExperience(selectUser.experience);
      setSelectedSkills(selectUser.skills);
      setSelectedApis(selectUser.apis);
      setSelectedVersionControl(selectUser.versionControl);
      setSelectedTestingTools(selectUser.testingTools);
    }
  }, [
    selectUser,
    setSelectedApis,
    setSelectedExperience,
    setSelectedName,
    setSelectedSkills,
    setSelectedTestingTools,
    setSelectedVersionControl,
  ]);

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogTitle>Vizualisar Candidato: {selectUser.name}</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            id="selectedName"
            label="Nome"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="experience"
            label="Experiência (em anos)"
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box sx={{ display: "flex", gap: "3rem" }}>
            <Skills initialSkills={selectUser.skills} isEdit />
            <APIsCandidate initialAPIs={selectUser.apis} isEdit />
            <VersionControl
              initialVersionControl={selectUser.versionControl}
              isEdit
            />
            <TestingTools
              initialTestingTools={selectUser.testingTools}
              isEdit
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Fechar
        </Button>
        <Button onClick={handleEdit} color="secondary">
          Editar Candidato
        </Button>
        <Button onClick={() => handleDelete(selectUser)} color="secondary">
          Excluir Candidato
        </Button>
      </DialogActions>
    </Dialog>
  );
}
