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

export default function VersionControl({
  initialVersionControl = [],
  disabled = false,
}) {
  const { handleCheckboxChange } = useApi();
  const { versionControl, setVersionControl } = useApiContext();

  useEffect(() => {
    if (initialVersionControl.length > 0) {
      setVersionControl(initialVersionControl);
    }
  }, [initialVersionControl, setVersionControl]);

  const handleChange = (event) => {
    if (!disabled) {
      handleCheckboxChange(event, setVersionControl, versionControl);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal" disabled={disabled}>
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
                value={version}
                checked={versionControl.includes(version)}
                onChange={handleChange}
                disabled={disabled}
              />
            }
            label={version}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
