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

export default function Skills({ initialSkills = [], isEdit }) {
  const { handleCheckboxChange } = useApi();
  const { skills, setSkills } = useApiContext();

  useEffect(() => {
    if (initialSkills.length > 0) {
      setSkills(initialSkills);
    }
  }, [initialSkills, setSkills]);

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (!isEdit) {
      handleCheckboxChange(event, setSkills, skills);
    } else {
      if (checked) {
        setSkills((prev) => [...prev, value]);
      } else {
        setSkills((prev) => prev.filter((skill) => skill !== value));
      }
    }
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend" color="secondary">
        Skills
      </FormLabel>
      <FormGroup>
        {[
          "React",
          "Typescript",
          "CSS",
          "Javascript",
          "HTML",
          "Vue",
          "Angular",
        ].map((skill) => (
          <FormControlLabel
            key={skill}
            control={
              <Checkbox
                color="secondary"
                value={skill}
                checked={skills?.includes(skill)}
                onChange={handleChange}
                // disabled={disabled}
              />
            }
            label={skill}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
