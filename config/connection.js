import { Connection, Request } from "tedious";
import dotenv from "dotenv";

dotenv.config();

const config = {
  server: process.env.DB_SERVER, // SQL Server Hostname/IP
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER, // SQL Username
      password: process.env.DB_PASSWORD, // SQL Password
    },
  },
  options: {
    database: process.env.DB_NAME, // Your Database Name
    encrypt: true, // Use encryption (set to false if not using SSL)
    trustServerCertificate: true, // Required for self-signed certificates
  },
};

const connectDB = () => {
  const connection = new Connection(config);

  connection.on("connect", (err) => {
    if (err) {
      console.error("Database Connection Failed! 😞", err);
    } else {
      console.log("✅ Connected to SQL Server!");
    }
  });

  connection.connect();
};

export default connectDB;
