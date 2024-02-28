// SQL queries
const db = require('./db');
import bcrypt from 'bcryptjs';

function getUsers() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usermodels', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM usermodels WHERE email = ${db.escape(email)}`;
    db.query(query, (err, rows) => {
      if (err) {
        console.error('Error finding user by email:', err);
        reject(err);
      } else {
        if (rows.length > 0) {
          resolve(rows[0]);
        } else {
          resolve(null);
        }
      }
    });
  });
}

async function createUser(email, password, first_name, last_name, status) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get current date in MySQL format
    const query = `INSERT INTO usermodels (email, password, first_name, last_name, status, createdAt, updatedAt) VALUES (${db.escape(email)}, ${db.escape(hashedPassword)}, ${db.escape(first_name)}, ${db.escape(last_name)}, ${db.escape(status)}, '${currentDate}', '${currentDate}')`;
    
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.error('Error creating user:', err);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  }
}

async function updateUser(userId, newData) {
  try {
    // Constructing the SET clause for the update query
    console.log(userId,"update",newData);
    const updateFields = [];
    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
        updateFields.push(`${key} = ${db.escape(newData[key])}`);
      }
    }
    const updateFieldsString = updateFields.join(', ');

    // Constructing the update query
    const query = `UPDATE usermodels SET ${updateFieldsString} WHERE id = ${db.escape(userId)}`;
    console.log(query);
    // Executing the update query
    db.query(query);
    console.log("query");

    return true; // Return true if update is successful
  } catch (error) {
    console.error('Error updating user:', error);
    return false; // Return false if update fails
  }
}

function getUserById(userId) {
  console.log(userId,'userId');
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM usermodels WHERE id = ${db.escape(userId)}`;
    db.query(query, (err, rows) => {
      if (err) {
        console.error('Error finding user by ID:', err);
        reject(err);
      } else {
        if (rows.length > 0) {
          resolve(rows[0]);
        } else {
          resolve(null); // Resolve with null if user is not found
        }
      }
    });
  });
}


module.exports = {
  getUsers,
  findUserByEmail,
  createUser,
  updateUser,
  getUserById
};
