const express = require("express");
const app = express();
app.use(express.json());
const dbConfig = require("./dbConfig");
require("dotenv").config();

const UserSchema = require("./models/userSchema");
const router = require("./routes");
app.use(express.json());
dbConfig();
app.use(router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log(`Server is running`);
});
