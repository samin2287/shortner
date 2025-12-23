const express = require("express");
const {
  craeteShortURL,
  getShortURLs,
} = require("../controllers/shortnerController");
const { authMiddleWare, isAuthentic } = require("../middleware/authMiddleWare");
const router = express.Router();

router.post("/create", isAuthentic, craeteShortURL);
router.get("/getall", authMiddleWare, getShortURLs);
module.exports = router;
