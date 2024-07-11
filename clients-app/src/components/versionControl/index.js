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
      <FormLabel component="legend">Controle de Versão</FormLabel>
      <FormGroup>
        {["Git", "SVN", "Mercurial", "Perforce"].map((vc) => (
          <FormControlLabel
            key={vc}
            control={
              <Checkbox
                value={vc}
                checked={versionControl.includes(vc)}
                onChange={handleChange}
                disabled={disabled}
              />
            }
            label={vc}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
