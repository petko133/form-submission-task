# Form Submission Task

This project is a form submission task using Mock servers and built using modern web development tools and libraries. It leverages **React** for building the user interface, **TypeScript** for type safety, **React Hook Form** for form management, **Zod** for schema validation, and **Chakra UI** + **Tailwind** for styling.

## Form Fields and Validations

The form includes the following fields with validations:

-   **Name**: A required text field for the user's name.
-   **Password**: A required password field with a minimum length of 4 characters.
-   **Confirm Password**: A required field that must match the password.
-   **Interests**: A multi-select field for users to choose their interests.
-   **Image Upload**: A required field for uploading an image file, with validation for file type.

## Features

-   User-friendly form submission.
-   Type-safe development with TypeScript.
-   Form validation using Zod.
-   Responsive and accessible UI with Chakra UI.

## Installation

Follow these steps to set up the project:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running:

    ```bash
    npm install
    ```

## Running the Project

To start the development server, use the following command:

    ```bash
    npm run dev
    ```

This will start the application, and you can access it in your browser at `http://localhost:3000`.

## Running Tests

To run the test suite, execute:

    ```bash
    npm run test
    ```

This will run all the tests and display the results in the terminal.

## Overview of Folder Structure

The project follows a structured folder organization to ensure maintainability and scalability:

```
/src
    ├── components    # Reusable React components
    ├── app           # Page-level components
    ├── styles        # Global and component-specific styles
    ├── __tests__     # Unit and integration tests
```

## Important Notes

-   Ensure that you have Node.js (version 16 or higher) installed on your system before running the project.
-   Refer to the official documentation of the libraries used for advanced configurations and usage.
-   Chakra UI and Tailwind can be used interchangeably for styling, depending on your preference.

## Technologies Used

-   **React**: A JavaScript library for building user interfaces.
-   **TypeScript**: A superset of JavaScript that adds static typing.
-   **React Hook Form**: A library for managing forms in React.
-   **Zod**: A TypeScript-first schema declaration and validation library.
-   **Chakra UI**: A modular and accessible component library for React.
