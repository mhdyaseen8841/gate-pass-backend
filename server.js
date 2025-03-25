import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/connection.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import rateLimit from "express-rate-limit";
import visitorReportsRouter from "./routes/visitorReportsRoute.js";
import loginRouter from "./routes/loginRoute.js";

const PORT = process.env.PORT || 4000;
const app = express();
const httpServer = createServer(app);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(cookieParser());

let pool; // Define pool variable

connectDB()
  .then((dbPool) => {
    pool = dbPool;

    // ✅ Attach DB connection to requests only after it's available
    app.use((req, res, next) => {
      if (!pool) {
        return res.status(500).json({ error: "Database connection not available" });
      }
      req.db = pool;
      next();
    });

    // ✅ Start the server only after DB connection is ready

  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    // process.exit(1); // Exit if DB connection fails
  });

  httpServer.listen(PORT, () => {
    console.log("✅ Server running on port " + PORT);
  });
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => req.clientIp,
  handler: (req, res, ___, options) => {
    res.status(429).json({
      msg: `Too many requests. Only ${options.max} requests per ${options.windowMs / 60000} minutes allowed.`,
    });
  },
});

app.get("/", (req, res) => {
  res.send("Welcome to the Gate Pass API!");
});

app.use("/api", visitorReportsRouter);
app.use("/api/user", loginRouter)

export default app;
