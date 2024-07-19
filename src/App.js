import React, { useState } from "react";
import Form from "./Form";

const initialData = {
  country: "",
  percentage: "",
  countryList: [],
};

const App = () => {
  const [jsonData, setJsonData] = useState(initialData);

  return (
    <div className="wrapper">
      <div>
        <Form initialData={jsonData} setJsonData={setJsonData} />
      </div>
      <div>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default App;
