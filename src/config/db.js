import mysql2 from "mysql2/promise";
import dotend from "dotenv";

dotenv.config();

export const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  queueLimit: process.env.DB_QUEUE_LIMIT,
});
