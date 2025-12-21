const { default: mongoose } = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  visitHistory: [
    {
      visitTime: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});
module.exports = mongoose.model("shorturl", shortnerSchema);
