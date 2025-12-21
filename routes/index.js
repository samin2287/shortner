const express = require("express");

const router = express.Router();
const authRouter = require("./auth");
const shortURLRouter = require("./shortURL");
const { redirectURL } = require("../controllers/shortnerController");

router.get("/", (req, res) => {
  res.send("API is working");
});
router.use("/auth", authRouter);
router.use("/url", shortURLRouter);
router.get("/:id", redirectURL);
router.use((req, res) => {
  res.status(404).send("Route Not Found");
});
module.exports = router;
