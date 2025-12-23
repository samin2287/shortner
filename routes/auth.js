const express = require("express");
const { signup, login, getProfile } = require("../controllers/authControllers");
const { authMiddleWare } = require("../middleware/authMiddleWare");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleWare, getProfile);

module.exports = router;
