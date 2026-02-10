const { verifyAccessToken } = require("../utils/token");

// Optional auth: if token present and valid, set req.user; otherwise continue
const isAuthentic = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers?.accesstoken || req.headers?.accessToken;

    if (!token) return next();

    const decoded = verifyAccessToken(token);
    if (!decoded) return res.status(401).send({ message: "Unauthorized request" });

    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized request" });
  }
};

// Strict auth: require a valid token from cookie or header
const authMiddleWare = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers?.accesstoken || req.headers?.accessToken;
    if (!token) return res.status(401).send({ message: "Unauthorized request" });

    const decoded = verifyAccessToken(token);
    if (!decoded) return res.status(401).send({ message: "Unauthorized request" });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized request" });
  }
};

module.exports = { isAuthentic, authMiddleWare };
