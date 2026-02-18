const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const dbConfig = require("./dbConfig");
require("dotenv").config();
const UserSchema = require("./models/userSchema");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const { isValidURL } = require("./utils/validation");
const { generateRandomString } = require("./controllers/shortnerController");
const PORT = process.env.PORT || 8000;

app.use(express.json());
dbConfig();
app.use(cookieParser());
app.use(router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Test the utility functions
console.log(isValidURL(``));
console.log(generateRandomString(6));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
