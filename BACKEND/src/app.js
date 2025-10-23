const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
app.use(cors());
app.use(express.json({}));

app.use(express.urlencoded({extended:false}));
app.use(morgan("dev"));
app.use("/api/v1/", require("./routes"))

module.exports = app;