const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// CORS: allow custom 'user' header and handle preflight explicitly
const corsOptions = {
	origin: true, // reflect request origin
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "user"],
	credentials: false,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({}));

app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));
app.use("/api/v1/", require("./routes"))

// Simple health check for uptime monitoring and cold-start debugging
app.get("/healthz", (req, res) => res.status(200).send("ok"));

module.exports = app;