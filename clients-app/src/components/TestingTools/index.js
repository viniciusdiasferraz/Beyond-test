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

export default function TestingTools({
  initialTestingTools = [],
  disabled = false,
}) {
  const { handleCheckboxChange } = useApi();
  const { testingTools, setTestingTools } = useApiContext();

  useEffect(() => {
    if (initialTestingTools.length > 0) {
      setTestingTools(initialTestingTools);
    }
  }, [initialTestingTools, setTestingTools]);

  const handleChange = (event) => {
    if (!disabled) {
      handleCheckboxChange(event, setTestingTools, testingTools);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal" disabled={disabled}>
      <FormLabel component="legend">Ferramentas de Teste</FormLabel>
      <FormGroup>
        {[
          "Jest",
          "Mocha",
          "Jasmine",
          "Karma",
          "QUnit",
          "Testing Library",
          "Cypress",
        ].map((tool) => (
          <FormControlLabel
            key={tool}
            control={
              <Checkbox
                value={tool}
                checked={testingTools.includes(tool)}
                onChange={handleChange}
                disabled={disabled}
              />
            }
            label={tool}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
