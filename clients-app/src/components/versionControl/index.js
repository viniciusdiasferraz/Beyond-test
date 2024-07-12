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

export default function VersionControl({ initialVersionControl = [], isEdit }) {
  const { handleCheckboxChange } = useApi();
  const { versionControl, setVersionControl } = useApiContext();

  useEffect(() => {
    if (initialVersionControl.length > 0) {
      setVersionControl(initialVersionControl);
    }
  }, [initialVersionControl, setVersionControl]);

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (!isEdit) {
      handleCheckboxChange(event, setVersionControl, versionControl);
    } else {
      if (checked) {
        setVersionControl((prev) => [...prev, value]);
      } else {
        setVersionControl((prev) =>
          prev.filter((version) => version !== value)
        );
      }
    }
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend" color="secondary">
        Controle de Versão
      </FormLabel>
      <FormGroup>
        {["Git", "SVN", "Mercurial", "Perforce"].map((version) => (
          <FormControlLabel
            color="secondary"
            key={version}
            control={
              <Checkbox
                color="secondary"
                value={version}
                checked={versionControl.includes(version)}
                onChange={handleChange}
              />
            }
            label={version}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
