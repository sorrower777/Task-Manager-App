import dotenv from "dotenv";
import colors from "colors";
import app from "./src/app.js"
import { ConnectDb } from "./src/db.config.js";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 3000;

ConnectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow);
});