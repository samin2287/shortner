const craeteShortURL = async (req, res) => {
  const { originalURL } = req.body;

  if (!originalURL) {
    return res.status(400).send("URL is required");
  }
};
