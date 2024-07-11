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

export default function APIsCandidate({ initialAPIs = [], disabled = false }) {
  const { handleCheckboxChange } = useApi();
  const { apis, setApis } = useApiContext();

  useEffect(() => {
    if (initialAPIs.length > 0) {
      setApis(initialAPIs);
    }
  }, [initialAPIs, setApis]);

  const handleChange = (event) => {
    if (!disabled) {
      handleCheckboxChange(event, setApis, apis);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal" disabled={disabled}>
      <FormLabel component="legend" color="secondary">
        APIs
      </FormLabel>
      <FormGroup>
        {["RESTful", "GraphQL", "gRPC", "WebSockets", "SOAP", "JSON-RPC"].map(
          (api) => (
            <FormControlLabel
              key={api}
              control={
                <Checkbox
                  color="secondary"
                  value={api}
                  checked={apis.includes(api)}
                  onChange={handleChange}
                  disabled={disabled}
                />
              }
              label={api}
            />
          )
        )}
      </FormGroup>
    </FormControl>
  );
}
