const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 2,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
    minlength: 6,
  },
  image: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
