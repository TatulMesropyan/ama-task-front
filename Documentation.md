# Bank Customer Statement Processor - Frontend

The frontend of the Bank Customer Statement Processor is developed using ReactJS with Material-UI (MUI) components. It allows users to upload CSV or XML files for validation and communicates with the backend API hosted at `https://9fh7ccld16.execute-api.eu-central-1.amazonaws.com/default`.

The frontend is hosted as a static website on Amazon S3 and can be accessed at [http://ama-frontend.s3-website.eu-central-1.amazonaws.com/](http://ama-frontend.s3-website.eu-central-1.amazonaws.com/).

## Technologies Used

- **ReactJS**: A JavaScript library for building user interfaces, providing a dynamic and efficient way to create interactive web applications.

- **Material-UI (MUI)**: A popular React UI framework that implements Google's Material Design to create responsive and aesthetically pleasing user interfaces.

## Continuous Integration / Continuous Deployment (CI/CD)

The frontend project utilizes GitHub Actions for CI/CD. The workflow is triggered on pushes to the main branch and pull requests targeting the main branch. The CI/CD pipeline includes the following steps:

1. **Test**: Executes tests to ensure the codebase's integrity.
2. **Lint**: Checks the codebase for coding style and potential issues.
3. **Build**: Compiles the React application for production deployment.
4. **Deploy**: Uploads the built assets to an Amazon S3 bucket, making the frontend accessible.

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
