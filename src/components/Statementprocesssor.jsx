import React, { useState } from "react";

const StatementProcessor = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [validations, setValidations] = useState([]);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const processFile = async () => {
    if (!file) {
      setOutput("Please choose a file before processing.");
      return;
    }
    if (file.type !== "text/csv" && file.type !== "text/xml") {
      setOutput("Invalid file format. Please choose a CSV or XML file.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        `https://1zwc7r4pp1.execute-api.eu-central-1.amazonaws.com/default/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const result = await response.json();
        setValidations(result.validations);
      } else {
        setOutput("Error processing the file on the server.");
      }
    } catch (error) {
      console.error("Error sending file to the server:", error);
      setOutput("Error sending file to the server.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ color: "#333" }}>Bank Customer Statement Processor</h1>
      <input
        type="file"
        accept=".csv, .xml"
        onChange={handleFileUpload}
        style={{ margin: "10px 0", padding: "5px", borderRadius: "5px" }}
      />
      <button
        onClick={processFile}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Process File
      </button>
      <div
        id="output"
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        {output}
      </div>
      {validations.length ? (
        validations.map((validation, index) => (
          <div key={index}>
            <p>Reference: {validation.reference}</p>
            <p>Description: {validation.description}</p>
            <p>Validation: {validation.validation}</p>
            <hr />
          </div>
        ))
      ) : (
        <p> No validations found.</p>
      )}
    </div>
  );
};

export default StatementProcessor;
