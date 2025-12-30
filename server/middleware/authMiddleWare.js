const { verifyAccessToken } = require("../utils/token");

const isAuthentic = (req, res, next) => {
  try {
    const token = req.headers.accesstoken;

    const decoded = verifyAccessToken(token);
    if (!decoded)
      return res.status(401).send({ message: "Unauthorized request1" });

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send("Unauthorize request");
  }
};

const authMiddleWare = (req, res, next) => {
  try {
    const token = req.headers.accesstoken;
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return res.status(401).send({ message: "Unauthorized request" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send("Unauthorize request");
  }
};

module.exports = { isAuthentic, authMiddleWare };
