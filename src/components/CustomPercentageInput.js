import React from "react";
import { TextField } from "@mui/material";

const CustomPercentageInput = ({ data, handleChange, path }) => {
  const handleInputChange = (event) => {
    let value = event.target.value;
    // Ensure only numeric values and within range 0-100
    value = value.replace(/\D/g, "");
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      handleChange(path, value === "" ? "" : Number(value));
    }
  };

  return (
    <TextField
      label="Pourcentage"
      value={data || ""}
      onChange={handleInputChange}
      type="number"
      InputProps={{ inputProps: { min: 0, max: 100 } }}
    />
  );
};

export default CustomPercentageInput;
