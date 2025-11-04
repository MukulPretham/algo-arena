# Algo Arena

This repository appears to be a platform for coding contests and problems, built with Next.js for the frontend and utilizing Prisma for database interactions. It features functionalities for managing contests, problems, and user participation.

## Features

Based on the provided code snippets, the project includes the following key features:

*   **Contest Management**:
    *   Creation of new contests with defined start and end dates.
    *   Fetching details of specific contests.
    *   Displaying problems associated with a contest.
*   **User Participation in Contests**:
    *   Users can join contests.
    *   Checking if a user is already a participant in a contest.
    *   Displaying user scores within a contest.
*   **Problem Solving Interface**:
    *   Provides a dedicated page for solving problems within a contest.
    *   Integration with a boilerplate function for problem solutions (e.g., `Two Sum`).

## Technologies Used

*   **Next.js**: For building the web application and API routes.
*   **React**: For the user interface components.
*   **Prisma**: For database access and management (indicated by `@repo/db/client`).
*   **TypeScript**: For type-safe JavaScript development.

## Project Structure Highlights

The repository seems to follow a monorepo structure, with `apps/web` for the main web application and `apps/problems` for problem definitions.

*   `apps/web/app/(home)/contests/[contestId]/page.tsx`: This file is a client-side React component responsible for displaying a specific contest. It fetches contest details, problems, and user participation status. It also handles the logic for a user to join a contest and displays their score.
*   `apps/web/app/api/(admin)/add-Contest/route.ts`: This is an API route used by administrators to add new contests to the platform. It takes contest name and start/end dates as input and interacts with the database to create the contest entry.
*   `apps/problems/Two Sum/boilder-plate/function.ts`: This file likely serves as a template or boilerplate for coding problems, in this case, for a "Two Sum" problem.

## Getting Started

To get a local copy up and running, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/MukulPretham/algo-arena.git
    cd algo-arena
    ```
2.  **Install dependencies**:
    This project appears to use `pnpm` based on `pnpm-lock.yaml`.
    ```bash
    pnpm install
    ```
3.  **Database Setup**:
    *   Ensure your database is configured (e.g., PostgreSQL, MySQL).
    *   Update the Prisma schema in `packages/db/prisma/schema.prisma` if necessary.
    *   Run Prisma migrations:
        ```bash
        pnpm db:push # or pnpm prisma migrate dev
        ```
4.  **Environment Variables**:
    *   Create a `.env` file in `apps/web` and configure necessary environment variables (e.g., database connection string, NextAuth.js secrets).
5.  **Run the development server**:
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints (Admin)

*   `POST /api/(admin)/add-Contest`: Creates a new contest. Requires `name` and `datePayload` (with `start` and `ends` objects containing `year`, `month`, `day`, `hour`, `minute`, `seconds`) in the request body.

## API Endpoints (Contests)

*   `GET /api/getContest/[contestId]`: Fetches details for a specific contest.
*   `GET /api/contest/[contestId]`: Retrieves problems associated with a specific contest.
*   `POST /api/check-participant`: Checks if a user is a participant in a given contest. Requires `username` and `contestId` in the request body.
*   `POST /api/join-Contest`: Allows a user to join a contest. Requires `username` and `contestId` in the request body.

---

This README provides a basic overview. You might want to expand on specific problem structures, contribution guidelines, or deployment instructions.
