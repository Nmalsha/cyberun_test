import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { Typography, Button } from "@mui/material";

import CustomCountryInput from "./components/CustomCountryInput";
import CustomPercentageInput from "./components/CustomPercentageInput";
import "./App.css";

const countries = [
  "France",
  "Belgique",
  "Allemagne",
  "Espagne",
  "Italie",
  "Portugal",
  "Pays-Bas",
  "Suisse",
];

// JSON Schema
const schema = {
  type: "object",
  properties: {
    country: {
      type: "string",
      title: "Pays",
      enum: countries,
    },
    percentage: {
      type: "number",
      title: "Pourcentage",
    },
  },
  required: ["country", "percentage"],
};

// UI Schema
const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/country",
      options: {
        custom: "country",
      },
    },
    {
      type: "Control",
      scope: "#/properties/percentage",
      options: {
        custom: "percentage",
      },
    },
  ],
};

// Renderers
const renderers = [
  ...materialRenderers,
  {
    tester: ({ schema, uischema }) =>
      schema &&
      schema.type === "string" &&
      uischema.options &&
      uischema.options.custom === "country",
    renderer: CustomCountryInput,
  },
  {
    tester: ({ schema, uischema }) =>
      schema &&
      schema.type === "number" &&
      uischema.options &&
      uischema.options.custom === "percentage",
    renderer: CustomPercentageInput,
  },
];

const Form = ({ initialData, setJsonData }) => {
  const [formData, setFormData] = useState({ country: "", percentage: "" });
  const [countryList, setCountryList] = useState([]);

  const handleChange = ({ data }) => {
    setFormData(data);
  };

  const handleAddCountry = () => {
    const newCountryList = [...countryList];
    newCountryList.push(formData);
    setCountryList(newCountryList);
    setFormData({ country: "", percentage: "" });

    if (newCountryList == 3) {
      handleCompletePercentage();
    }
  };

  const calculateRemainingPercentage = () => {
    const totalPercentage = countryList.reduce(
      (acc, curr) => acc + curr.percentage,
      0
    );
    return 100 - totalPercentage;
  };

  useEffect(() => {
    if (countryList.length === 3) {
      handleCompletePercentage();
    }
    setJsonData({
      ...formData,
      countryList,
    });
  }, [countryList, countryList, setJsonData]);

  const handleCompletePercentage = () => {
    const totalPercentage = countryList.reduce(
      (acc, curr) => acc + curr.percentage,
      0
    );
    const remainingPercentage = 100 - totalPercentage;

    if (remainingPercentage > 0) {
      const newCountryList = [...countryList];
      newCountryList.push({
        country: "Inconnu",
        percentage: remainingPercentage,
      });
      setCountryList(newCountryList);
    }
  };

  const remainingPercentage = calculateRemainingPercentage();

  return (
    <div className="container">
      <Typography variant="h4" className="title_h4">
        Formulaire
      </Typography>
      <div className="container_inputs">
        <div className="form_style">
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={formData}
            renderers={renderers}
            cells={materialCells}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button variant="contained" color="secondary" onClick={handleAddCountry}>
        Ajouter
      </Button>
      <Typography variant="h6">Liste des pays ajoutés :</Typography>
      <ul className="display_result">
        {countryList.map((item, index) => (
          <li key={index}>
            {item.country} - {item.percentage}%
          </li>
        ))}
      </ul>
      {remainingPercentage > 0 && (
        <Typography variant="h6">
          Pourcentage restant : {calculateRemainingPercentage()}%
        </Typography>
      )}
    </div>
  );
};
export default Form;
