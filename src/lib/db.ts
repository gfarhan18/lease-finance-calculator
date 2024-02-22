import { Connection, createConnection } from 'mysql2/promise';
import mysql from 'serverless-mysql';
let connection: Connection ;
async function connectToDatabase() {
  try {
    connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 3307
    });
    console.log('Connected to MySQL!');
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
}

export default async function executeQuery({ query}: { query: string}): Promise<[unknown, any]> {
  try {
    await connectToDatabase();
    console.log(connection, 'my to MySQL');
    if(connection) {
      console.log('Connected to', connection);
      const results = await connection.query(query);
      return [results, null]; // Return results and set error to null

    }
    return [null,null]; //
  } catch (error) {
    return [null, error]; // Return null for results and error
  } 
  finally {
    await connection.end();
  }
}

