import React, { useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
} from "@mui/material";
import useApi from "../../hooks/useApi";
import { useApiContext } from "../../context/context";

export default function Skills({ initialSkills = [], disabled = false }) {
  const { handleCheckboxChange } = useApi();
  const { skills, setSkills } = useApiContext();

  useEffect(() => {
    if (initialSkills.length > 0) {
      setSkills(initialSkills);
    }
  }, [initialSkills, setSkills]);

  const handleChange = (event) => {
    if (!disabled) {
      handleCheckboxChange(event, setSkills, skills);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal" disabled={disabled}>
      <FormLabel component="legend" color="secondary">
        Skills
      </FormLabel>
      <FormGroup>
        {["React", "Typescript", "CSS", "Javascript", "HTML", "Vue"].map(
          (skill) => (
            <FormControlLabel
              key={skill}
              control={
                <Checkbox
                  color="secondary"
                  value={skill}
                  checked={skills?.includes(skill)}
                  onChange={handleChange}
                  disabled={disabled}
                />
              }
              label={skill}
            />
          )
        )}
      </FormGroup>
    </FormControl>
  );
}
