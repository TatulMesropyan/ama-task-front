import React, { useState } from "react";

const StatementProcessor = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [link, setLink] = useState(null);

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
      const blob = new Blob([file], { type: file.type });
      const response = await fetch("testapi", {
        method: "POST",
        body: blob,
      });
      if (response.ok) {
        const result = await response.json();
        setOutput(result.message);
      } else {
        setOutput("Error processing the file on the server.");
      }
    } catch (error) {
      console.error("Error sending file to the server:", error);
      setOutput("Error sending file to the server.");
    }
  };

  return (
    <div>
      <h1>Bank Customer Statement Processor</h1>
      <input type="file" accept=".csv, .xml" onChange={handleFileUpload} />
      <button onClick={processFile}>Process File</button>
      {/* <a href={link}>Test download blob</a> */}
      <div id="output">{output}</div>
    </div>
  );
};

export default StatementProcessor;
