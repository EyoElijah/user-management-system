import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: '',
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(' connection:>> ', connection.threadId);
  return connection;
});

export default pool;
