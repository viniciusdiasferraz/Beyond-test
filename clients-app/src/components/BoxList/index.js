import React from "react";
import { Typography, Box } from "@mui/material";

const BoxList = ({ title, items }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Typography variant="subtitle1">{title}</Typography>
      {items?.map((item, index) => (
        <Typography key={index} variant="body2">
          {item}
        </Typography>
      ))}
    </Box>
  );
};

export default BoxList;
