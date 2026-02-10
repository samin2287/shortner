const express = require("express");
const { signup, login, getProfile,logout } = require("../controllers/authControllers");
const { authMiddleWare } = require("../middleware/authMiddleWare");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", authMiddleWare, getProfile);

module.exports = router;
