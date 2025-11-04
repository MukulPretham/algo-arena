# Algo-Arena

Algo-Arena is a platform designed for competitive programming and algorithmic challenges. It provides functionalities for users to solve problems, participate in contests, and track their submissions. The platform includes a robust backend for handling problem submissions, running test cases, and managing user data and contest information.

## Features

*   **User Authentication**: Secure user registration and login.
*   **Problem Solving**: Users can view and solve algorithmic problems.
*   **Contest Management**: Support for creating and participating in coding contests.
*   **Submission System**: Handles code submissions, runs against test cases, and provides feedback.
*   **Database Management**: Persistent storage for users, problems, test cases, topics, submissions, and contest data.

## Tech Stack

This project is a monorepo utilizing:

*   **Next.js**: For the frontend web application.
*   **TypeScript**: For type-safe development across the codebase.
*   **Prisma**: As the ORM for database interactions (PostgreSQL).
*   **RapidAPI (Judge0)**: Integrated for code compilation and execution against test cases.

## Getting Started

This is a pnpm monorepo. To set up the project locally:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/MukulPretham/algo-arena.git
    cd algo-arena
    ```
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Database Setup**:
    *   Ensure you have a PostgreSQL database running.
    *   Update the `DATABASE_URL` in `apps/web/.env` and `packages/db/.env` (or similar configuration files) to point to your database.
    *   Run Prisma migrations to set up your database schema:
        ```bash
        pnpm db:push # or pnpm prisma migrate dev
        ```
4.  **Environment Variables**:
    *   Create a `.env` file in `apps/web/` and `packages/db/` if they don't exist.
    *   Add necessary environment variables, including `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXT_PUBLIC_RapidApiUrl`, and `NEXT_PUBLIC_RapidApiKey` (for the judging API).
5.  **Run the development servers**:
    ```bash
    pnpm dev
    ```

This will start the Next.js application and any other services defined in the monorepo.
