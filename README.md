# Playwright-Typescript-Kaleidoscope-Application

This project is a Playwright automation suite designed to test the Kaleidoscope Applicant Application process.

## Scholarship Landing Page

The application process is tested for the following program:
[Scholarship Landing Page](https://apply.mykaleidoscope.com/program/sdet-test-scholarship)

## Steps Automated

The following steps are automated as part of the test suite:

1. **Register a New User**
2. **Begin a New Application**  
   Start an application for the provided program:  
   [Program URL](https://apply.mykaleidoscope.com/program/sdet-test-scholarship)
3. **Step Through Each Page and Fill Out Questions**
   - **Page 1**  
     - Fill out all required fields.
   - **Page 2**  
     - Validate that at least 2 extracurricular activities are required when fewer are provided.  
     - Complete the page by providing 4 activities.
   - **Page 3**  
     - Fill out the form.  
     - Upload the provided school transcript (`My School Transcript.pdf`) located in the `src/data/` directory.
   - **Page 4**  
     - Validate that each option under "Please select the essay types you want to write about" displays an essay box:
       - Cars → Essay about Cars
       - Animals → Essay about Animals
       - School → Essay about School
       - Other → Provide an essay about any topic
     - Select only "Animals" and "School."
     - Provide answers to the two selected essay questions.
4. **On Review Page**
   - Validate that all pages and answers are displayed as answered.
5. **Submit Application**
   - Capture the page URL to allow redirection back after submission.
   - Validate that editing is not allowed after the application has been submitted.

## Project Structure

The project is organized as follows:


### Key Files and Directories

- **`src/pages/`**: Contains page object models for the application pages.
- **`src/data/`**: Includes test data files such as `My School Transcript.pdf`.
- **`src/tests/`**: Contains the test scripts for the automation suite.
- **`src/utils/`**: Contains utility functions and helper methods to support the test scripts.
- **`playwright.config.ts`**: Configuration file for Playwright.

## How to Run the Tests

1. Install dependencies:
   
   npm install
   npx playwright test
   npx playwright show-report