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

export default function APIsCandidate({ initialAPIs = [], isEdit }) {
  const { handleCheckboxChange } = useApi();
  const { apis, setApis } = useApiContext();

  useEffect(() => {
    if (initialAPIs.length > 0) {
      setApis(initialAPIs);
    }
  }, [initialAPIs, setApis]);

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (!isEdit) {
      handleCheckboxChange(event, setApis, apis);
    } else {
      if (checked) {
        setApis((prev) => [...prev, value]);
      } else {
        setApis((prev) => prev.filter((APIs) => APIs !== value));
      }
    }
  };

  return (
    <FormControl component="fieldset" margin="normal">
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
