# Problem5 - ExpressJS API with Prisma

## Getting Started
This project is a TypeScript-based ExpressJS API with Prisma for database management.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [PostgreSQL](https://www.postgresql.org/) or another supported database
- [Prisma CLI](https://www.prisma.io/docs)

## Installation
Clone the repository and install dependencies:
```sh
npm install
```

## Environment Configuration
Create a `.env` file in the root directory and set up your database URL:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
```
Replace `user`, `password`, and `mydatabase` with your actual database credentials.

## Setting Up Prisma
1. Initialize Prisma (if not already initialized):
   ```sh
   npx prisma init
   ```
2. Push the database schema:
   ```sh
   npx prisma db push
   ```
   OR, if using migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
3. Generate the Prisma client:
   ```sh
   npx prisma generate
   ```

## Running the Server
### Development Mode (Hot Reloading)
```sh
npm run dev
```

### Production Mode
1. Build the project:
   ```sh
   npm run build
   ```
2. Start the server:
   ```sh
   npm start
   ```

## Code Formatting
Run Prettier to format the code:
```sh
npm run prettify
```

## License
This project is licensed under the ISC License.

