import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const CustomCountryInput = ({ data, handleChange, path, countries }) => {
  const handleInputChange = (event, value) => {
    handleChange(path, value);
  };

  return (
    <Autocomplete
      options={countries}
      value={data || ""}
      onChange={handleInputChange}
      renderInput={(params) => <TextField {...params} label="Pays" />}
    />
  );
};

export default CustomCountryInput;
