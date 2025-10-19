require("dotenv").config({
    path:".env"
});
require("colors")
const app = require("./src/app");
const { ConnectDb} = require("./src/db.config.js");
const PORT = process.env.PORT || 3000;
ConnectDb();


app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})