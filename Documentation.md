# Bank Customer Statement Processor - Frontend

The frontend of the Bank Customer Statement Processor allows users to upload CSV or XML files for validation. It communicates with the backend API hosted at `https://9fh7ccld16.execute-api.eu-central-1.amazonaws.com/default`.

## Usage

1. Visit the Bank Customer Statement Processor frontend in your web browser.
2. Choose a CSV or XML file using the provided interface.
3. Click the "Process File" button to send the file to the server for validation.
4. View the validation results and any error messages on the webpage.

## File Validation Results

- The processed file's validation results are displayed on the webpage.
- The frontend outputs data that is not unique and identifies records with invalid mutations.
- If there are any errors during the file processing, appropriate error messages will be shown.
- Validations include details such as reference, description, and the validation outcome.
