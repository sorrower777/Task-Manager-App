import cors from "cors";
import express from "express";
import morgan from "morgan";
import routes from "./routes.js"

const app = express();

// CORS options
const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "user"],
  credentials: false,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/v1", routes);

// Health check
app.get("/healthz", (req, res) => res.status(200).send("ok"));

export default app;