import sql from "mssql";  // ✅ Correct way to import CommonJS in ES modules

const { ConnectionPool } = sql;  // Extract ConnectionPool

import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Use encryption (true for Azure SQL, false otherwise)
    trustServerCertificate: true, // Required for self-signed certificates
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 1,  // Minimum number of connections
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  },
};

const pool = new ConnectionPool(config);

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ Database connected successfully!");
    return pool;
  } catch (err) {
    console.error("❌ Database Connection Failed!", err);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
