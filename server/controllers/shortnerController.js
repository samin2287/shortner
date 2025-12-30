const { isValidURL } = require("../utils/validation");
const shortUrlSchema = require("../models/shortnerSchema");
const userSchema = require("../models/userSchema");

//<===RANDOM STRING GENERATOR FUNCTION START===>
const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
};
//<===RANDOM STRING GENERATOR FUNCTION END===>
//<===CREATE SHORT URL FUNCTION START===>
const craeteShortURL = async (req, res) => {
  try {
    const { originalURL } = req.body;

    if (!originalURL) {
      return res.status(400).send({ message: "URL is required" });
    }
    if (!isValidURL(originalURL)) {
      return res.status(400).send({ message: "Invalid URL format" });
    }
    const shortURL = generateRandomString(6);

    const URLData = new shortUrlSchema({
      originalURL,
      shortURL,
      user: req.user?.id,
    });

    await URLData.save();
    return res.status(201).send({
      originalURL: URLData.originalURL,
      shortURL: URLData.shortURL,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
//<===CREATE SHORT URL FUNCTION END===>
//<===REDIRECT URL FUNCTION START===>
const redirectURL = async (req, res) => {
  try {
    const params = req.params;
    if (!params.id) {
      return;
    }
    const urlData = await shortUrlSchema.findOne({ shortURL: params.id });
    if (!urlData) {
      return res.redirect(process.env.CLIENT_REDIRECT_URL + urlData.shortURL);
    }

    if (urlData.user) {
      urlData.visitHistory.push({ visitTime: Date.now() });
      await urlData.save();
    }
    res.redirect(urlData.originalURL);
  } catch (error) {
    res.redirect(process.env.CLIENT_REDIRECT_URL + urlData.shortURL);
  }
};
//<===REDIRECT URL FUNCTION END===>
const getShortURLs = async (req, res) => {
  try {
    const userId = req.user.id;
    const userURLs = await shortUrlSchema
      .find({ user: userId })
      .select("-user");
    res.status(200).send({ userURLs });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  generateRandomString,
  craeteShortURL,
  redirectURL,
  getShortURLs,
};
