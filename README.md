# Algo-Arena

Algo-Arena is a comprehensive platform designed for competitive programming and algorithmic problem-solving. It offers features for participating in coding contests, solving problems categorized by topics, and managing user submissions. The platform includes an administrative interface for adding and managing problems, test cases, and contests.

## Table of Contents

-   [Features](#features)
-   [Architecture](#architecture)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
-   [Project Structure](#project-structure)
-   [API Endpoints](#api-endpoints)
-   [Admin Functionality](#admin-functionality)
-   [Contributing](#contributing)
-   [License](#license)

## Features

*   **Contests:**
    *   Browse and join available coding contests.
    *   View contest details, including start and end dates.
    *   Solve problems within active contests and track your score.
*   **Problem Sets:**
    *   Explore a wide range of algorithmic problems.
    *   Filter problems by various topics.
    *   Solve individual problems outside of contests.
*   **Problem Solving Interface:**
    *   Detailed problem descriptions and examples.
    *   Integrated code editor for submitting solutions.
*   **User Authentication:**
    *   Secure user signup and login.
    *   User profile management.
*   **Admin Panel:**
    *   Add new problems with titles, statements, types, and topics.
    *   Manage and add multiple test cases (input, output, explanation) for problems.
    *   (Inferred) Create and manage coding contests.
    *   (Inferred) Add problems to specific contests.

## Architecture

This project is structured as a monorepo using `pnpm` and `Turborepo` for efficient dependency management and build processes. It consists of two main parts:

*   **`apps/web`**: The frontend application built with Next.js, providing the user interface and interacting with the backend API.
*   **`packages/db`**: Contains the Prisma ORM setup for database interactions, defining the schema and providing the database client.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (v18 or higher)
*   pnpm
*   A PostgreSQL database (or your preferred database supported by Prisma)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MukulPretham/algo-arena.git
    cd algo-arena
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in `apps/web` based on `.env.example` (if available, otherwise create one with necessary environment variables like database URL and NextAuth.js secrets).

    Example `apps/web/.env`:
    ```
    DATABASE_URL="postgresql://user:password@host:port/database"
    NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Database Setup:**
    Navigate to the `packages/db` directory and set up your database with Prisma:
    ```bash
    cd packages/db
    pnpm prisma migrate dev --name init # Or the latest migration command
    pnpm prisma generate
    cd ../.. # Go back to the root directory
    ```

5.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application should now be running on `http://localhost:3000`.

## Project Structure

```
├── apps/
│   └── web/                     # Next.js frontend application
│       ├── app/
│       │   ├── (home)/          # Pages accessible after authentication
│       │   │   ├── contests/    # Contest listing and specific contest pages
│       │   │   ├── problem-sets/ # Problem set listing and topic-specific pages
│       │   │   └── solve/       # Problem solving interface
│       │   └── api/             # Next.js API routes
│       │       ├── (admin)/     # Admin-specific API endpoints
│       │       ├── (contests)/  # Contest-related API endpoints
│       │       └── auth/        # Authentication API endpoints
│       └── components/          # Reusable React components (e.g., Code, Description, ProblemCard)
│
├── packages/
│   └── db/                      # Prisma database configuration and client
│       ├── prisma/              # Prisma schema and migrations
│       └── src/                 # Database client initialization
│
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── turbo.json                   # Turborepo configuration```

## API Endpoints

The `apps/web/app/api` directory contains various API endpoints:

*   **Contest Management:**
    *   `GET /api/contest`: Get all contests.
    *   `GET /api/contest/[contestId]`: Get problems for a specific contest.
    *   `GET /api/getContest/[contestId]`: Get details of a specific contest.
    *   `POST /api/check-participant`: Check if a user is a participant in a contest.
    *   `POST /api/join-Contest`: Allow a user to join a contest.

*   **Problem Management:**
    *   `GET /api/getProblem/[id]`: Get a problem by its ID.
    *   `GET /api/getTestCases/[id]`: Get test cases for a problem by its ID.
    *   `GET /api/problems/[topic]`: Get problems filtered by a specific topic.

*   **Authentication:**
    *   `POST /api/auth/signup`: User registration.
    *   `GET/POST /api/auth/[...nextauth]`: NextAuth.js authentication routes.

## Admin Functionality

The following API endpoints are available for administrative tasks:

*   `POST /api/(admin)/add-problem`: Add a new problem to the platform. Requires `title`, `statement`, `type`, `topic`, `testCaseInput`, `testCaseOutput`, and `explanation` in the request body.
*   `POST /api/(admin)/add-testcase`: Add a new test case to an existing problem. Requires `problemId`, `testCaseInput`, `testCaseOutput`, and `explanation` in the request body.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

[Specify your license here, e.g., MIT License]