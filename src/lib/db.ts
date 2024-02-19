// // lib/db.ts

// import { User } from "@/models/User";
// import { createConnection } from "typeorm";

// createConnection({
//   type: "mysql",
//   host: process.env.DB_HOST,
//   port: 3306,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [User], // Import your User model here
//   synchronize: true, // Automatic synchronization of schema changes
// })
//   .then(() => console.log("Database connected"))
//   .catch((error) => console.log("Error connecting to database: ", error));
