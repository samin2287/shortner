const express = require("express");
const { craeteShortURL } = require("../controllers/shortnerController");
const router = express.Router();

router.post("/create", craeteShortURL);
module.exports = router;
