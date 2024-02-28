import { createConnection, escape, Connection, RowDataPacket, FieldPacket } from 'mysql2/promise'; // Importing types from mysql2/promise for better TypeScript support
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
// import db from '@/pages/api/db/db';

// async function createUser(email: string, password: string, first_name: string, last_name: string, status: string): Promise<boolean> {
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get current date in MySQL format
//     const query = `INSERT INTO usermodels (email, password, first_name, last_name, status, createdAt, updatedAt) VALUES (${escape(email)}, ${escape(hashedPassword)}, ${escape(first_name)}, ${escape(last_name)}, ${escape(status)}, '${currentDate}', '${currentDate}')`;
//     await executeQuery({ query });
//     return true;
//   } catch (error) {
//     console.error('Error creating user:', error);
//     return false;
//   }
// }

// async function findUserByEmail(email: string): Promise<RowDataPacket | null> {
//   try {
//     console.log('email: running', email);
//     const query = `SELECT * FROM usermodels WHERE email = ${escape(email)}`;
//     const [rows, error]: [any, any] = await db.query({ query });
//     console.log(rows, "rows");
//     if (error) {
//       throw error;
//     }
//     return rows.length > 0 ? rows[0] : null;
//   } catch (error) {
//     console.error('Error finding user by email:', error);
//     return null;
//   }
// }

async function getAllUsers(): Promise<RowDataPacket[] | null> {
  try {
    const query = `SELECT * FROM usermodels`;
    const [rows, error]: [any, any] = await db.query( query );
    if (error) {
      throw error;
    }
    return rows;
  } catch (error) {
    console.error('Error getting all users:', error);
    return null;
  }
}

// async function updateUser(id: number, updatedFields: Partial<{ email: string, password: string, first_name: string, last_name: string, status: string }>): Promise<boolean> {
//   try {
//     const { email, password, first_name, last_name, status } = updatedFields;
//     const updateFields = Object.entries(updatedFields).map(([key, value]) => {
//       if (value) {
//         return `${key} = ${escape(value)}`;
//       }
//       return null;
//     }).filter(field => field !== null).join(', ');

//     const query = `UPDATE usermodels SET ${updateFields} WHERE id = ${id}`;
//     await executeQuery({ query });
//     return true;
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return false;
//   }
// }

export {  getAllUsers };
