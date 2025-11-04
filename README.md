# Algo Arena

This project appears to be a platform designed for competitive programming and algorithmic problem-solving. It provides an interface for users to view problem descriptions, write and submit code solutions, and have them evaluated against a set of test cases. The platform also includes support for contests and manages user submissions.

## Features

*   **User Authentication:** Secure user sessions and redirection for unauthenticated access.
*   **Problem Solving Interface:** Dedicated pages for viewing problem statements and an integrated code editor for submitting solutions.
*   **Dynamic Problem Loading:** Fetches problem details and associated test cases dynamically based on the problem ID.
*   **Code Submission & Evaluation:** Allows users to submit their code solutions, which are then evaluated against predefined test cases using an external judging API.
*   **Contest Support:** Integrates functionality for participating in and submitting solutions within coding contests.
*   **Database Integration:** Manages user data, problem details, contest information, and submission records.

## Technologies Used

*   **Next.js:** A React framework for building the web application.
*   **TypeScript:** Provides type safety and enhances code quality.
*   **Prisma:** An ORM (Object-Relational Mapper) used for interacting with the database.
*   **RapidAPI (Judge0 CE):** Utilized for external code compilation and execution to evaluate submitted solutions.

## Setup and Installation

To get this project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MukulPretham/algo-arena.git
    cd algo-arena
    ```

2.  **Install dependencies:**
    This project uses `pnpm` as a package manager.
    ```bash
    pnpm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in `apps/web` and configure the following:
    ```
    NEXT_PUBLIC_RapidApiUrl=YOUR_RAPIDAPI_JUDGE0_URL
    NEXT_PUBLIC_RapidApiKey=YOUR_RAPIDAPI_KEY
    # Add other environment variables for NextAuth and database connection (e.g., DATABASE_URL)
    ```

4.  **Database Setup:**
    Ensure your database is configured and run Prisma migrations to set up the schema:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application should now be running on `http://localhost:3000`.

## API Endpoints

### `POST /api/submit`

Handles the submission of user code for problem evaluation.

**Request Body:**

```json
{
    "problemId": "string",
    "username": "string",
    "contestId": "string (optional)",
    "payload": {
        "language_id": "number",
        "source_code": "string"
    }
}```

**Response:**

```json
{
    "status": "submitted",
    "id": "string",
    "tokens": ["string", "string", ...]
}```

This response includes a submission ID and an array of tokens, likely used to poll the judging API for results.
