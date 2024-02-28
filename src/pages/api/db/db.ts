// Database connection logic
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


const db = mysql.createConnection({
  host: 'localhost',
  user: 'ayesha',
  port: 3307,
  password: `ayesha`,
  database: 'lease-calculator-db',
});

db.connect((err: any) => {
  console.log('connecting........');

  if (err) throw err;
  console.log('Connected to MySQL database');
});

module.exports = db;


// import { Connection, createConnection } from 'mysql2/promise';
// import mysql from 'serverless-mysql';
// let connection: Connection;
// async function connectToDatabase() {
//   try {
//     console.log('Connecting to database');
//     connection = await createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       port: 3307
//     });
//     console.log('Connected to MySQL!', connection);
//   } catch (error) {
//     console.error('Error connecting to MySQL:', error);
//   }
// }

// export default async function executeQuery({ query }: { query: string }): Promise<[unknown, any]> {
//   try {
//     await connectToDatabase();
//     alert('my to MySQL');
//     if (connection) {
//       console.log('Connected to', connection);
//       const results = await connection.query(query);
//       await connection.end()
//       return [results, null]; // Return results and set error to null
//     }
//     return [null, null];
//   } catch (error) {
//     return [null, error]; // Return null for results and error
//   }
//   finally {
//     console.log('finally running', connection)
//     if (connection) await connection.end()
//   }
// }




// // const { MongoClient } = require('mongodb');

// // // MongoDB connection URI
// // const uri = process.env.MONGO_URL

// // // Create a new MongoClient
// // const client = new MongoClient(uri);

// // async function connectToMongoDB() {
// //   try {
// //     // Connect to the MongoDB server
// //     await client.connect();
// //     console.log("Connected to MongoDB");
// //     // Now you can interact with your MongoDB database
// //   } catch (error) {
// //     console.error("Error connecting to MongoDB:", error);
// //   } finally {
// //     // Ensure the client closes when you finish using it
// //     await client.close();
// //   }
// // }

// // // Call the function to connect
// // connectToMongoDB();
