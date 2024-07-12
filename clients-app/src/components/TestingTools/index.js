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

export default function TestingTools({ initialTestingTools = [], isEdit }) {
  const { handleCheckboxChange } = useApi();
  const { testingTools, setTestingTools } = useApiContext();

  useEffect(() => {
    if (initialTestingTools.length > 0) {
      setTestingTools(initialTestingTools);
    }
  }, [initialTestingTools, setTestingTools]);

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (!isEdit) {
      handleCheckboxChange(event, setTestingTools, testingTools);
    } else {
      if (checked) {
        setTestingTools((prev) => [...prev, value]);
      } else {
        setTestingTools((prev) => prev.filter((testing) => testing !== value));
      }
    }
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend" color="secondary">
        Ferramentas de Teste
      </FormLabel>
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
                color="secondary"
                value={tool}
                checked={testingTools.includes(tool)}
                onChange={handleChange}
              />
            }
            label={tool}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
