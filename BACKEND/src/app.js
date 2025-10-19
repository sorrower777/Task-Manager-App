const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors("*"));
app.use(express.json({}));

app.use(express.urlencoded({extended:false}));
app.use("/api/v1/", require("./routes"))

module.exports = app;