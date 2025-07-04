# PERSONAL HOMEPAGE 2025

This is the repository for my personal homepage, which is built using Next.js and NestJS.
The homepage is designed to showcase my projects, blog posts, and other personal content.
The homepage is hosted on Railway and uses Supabase for the database.

## Technologies Used

- **TypeScript**: For both frontend and backend development, ensuring type safety and better developer experience.
- **Tailwind CSS**: For styling the frontend, providing a modern and responsive design.
- **Prisma**: As the ORM for database interactions, simplifying data management and migrations.
- **PostgreSQL**: As the database, providing a reliable and scalable data storage solution
- **Next.js**: For the frontend, providing a fast and responsive user interface.
- **NestJS**: For the backend, offering a robust API to handle requests and manage data.
- **Vite**: For building the frontend, ensuring a smooth development experience with fast hot module replacement.
- **Supabase**: As the database solution, providing real-time capabilities and easy integration.
- **Docker**: For containerization, making it easy to deploy and manage the application.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/personal-homepage-2025.git
   cd personal-homepage-2025
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables. You can use the `.env.example` file as a reference.

4. Start the development server:
   ```bash
   pnpm dev
   ```
   will start both the website, admin and backend servers. The website will be available at `http://localhost:4200`, admin at `http://localhost:4300` and backend at `http://localhost:5000`.

## Run in docker

To run the application in Docker, you can use the provided `docker-compose.yml` file. Make sure you have Docker and Docker Compose installed.

1. Copy the `env.example` file to `.env` in the root directory and update the environment variables as needed.

2. Run the following command to start the application:

   ```bash
   docker-compose up --build
   ```

3. The application will be available at `http://localhost:3200` for the website, `http://localhost:3600` for the admin, and `http://localhost:4600` for the backend.

## Orchestration

To deploy the application using Docker Swarm, you can use the provided `docker.compose.stack.yml` file. Make sure you have Docker Swarm initialized.

1. Copy the `env.example` file to `.env` in the root directory and update the environment variables as needed.

2. Run the following command to deploy the application:

   ```
   docker stack deploy -c docker.compose.stack.yml --detach=true ph

   ```

3. The application will be available at `http://localhost:4200` for the website, `http://localhost:4300` for the admin, and `http://localhost:5000` for the backend.

4. Moreover, you can use the `visualizer` service to monitor the Docker Swarm cluster. Access it at `http://localhost:8080`.
