import React, { useState } from "react";
import {
  Button,
  Input,
  Typography,
  Snackbar,
  CircularProgress,
  Stack,
  Box,
  Divider,
  Alert,
} from "@mui/material";

const StatementProcessorPage = () => {
  const [file, setFile] = useState(null);
  const [validations, setValidations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const processFile = async () => {
    setIsLoading(true);
    try {
      if (!file) {
        setOpenSnackbar(true);
        setSnackbarMessage("Error: No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://192.168.16.100:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setValidations(result.validations);
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.errorMessage);
      }
    } catch (error) {
      console.error(error.message);
      setOpenSnackbar(true);
      setSnackbarMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack textAlign="center" useFlexGap>
      <Box
        display="flex"
        flexDirection="column"
        gap="25px"
        alignItems="center"
        sx={{ marginTop: "20px" }}
      >
        <Typography variant="h4" sx={{ color: "#333" }}>
          Bank Customer Statement Processor
        </Typography>
        <Box display="flex" flexDirection="row" gap="100px" alignItems="center">
          <Input type="file" accept=".csv, .xml" onChange={handleFileUpload} />
          <Button
            onClick={processFile}
            disabled={isLoading}
            variant="contained"
            color="success"
          >
            Process File
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        {isLoading ? (
          <Typography
            variant="subtitle1"
            sx={{ fontStyle: "italic", color: "#888" }}
          >
            Processing...
            <CircularProgress size={20} />
          </Typography>
        ) : Array.isArray(validations) && validations.length ? (
          <Stack useFlexGap sx={{ marginTop: "35px" }}>
            {validations?.map((validation, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <Typography variant="h6">
                  Reference: {validation.reference}
                </Typography>
                <Typography>Description: {validation.description}</Typography>
                <Typography>Validation: {validation.validation}</Typography>
                <Divider style={{ margin: "10px 0" }} />
              </div>
            ))}
          </Stack>
        ) : (
          <Typography
            variant="subtitle1"
            sx={{ fontStyle: "italic", color: "#888" }}
          >
            No validations to show.
          </Typography>
        )}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default StatementProcessorPage;
