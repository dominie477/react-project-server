const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const joi = require("joi");
const Card = require("../models/Card");

const cardSchema = joi.object({
  name: joi.string().required().min(2),
  phone: joi.number().required().min(2),
  address: joi.string().required().min(2),
  description: joi.string().required().min(2),
  image: joi.string().required(),
});

// Add Card only if isAdmin
router.post("/", auth, async (req, res) => {
  try {
    // check if the user is admin
    if (!req.payload.isAdmin)
      return res.status(400).send("Only admin can add cards");

    // joi validation for body
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // add the card to DB
    let card = new Card(req.body);
    await card.save();

    // send the new card details
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all Cards
router.get("/", auth, async (req, res) => {
  try {
    // search all cards
    let cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send("Error in get Cards");
  }
});
// Get Card Details by ID

router.get("/:id", auth, async (req, res) => {
  try {
    let card = await Card.findOne({ _id: req.params.id });
    if (!card) return res.status(404).send(`Card not found`);
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("Error in get Card");
  }
});
// Update card By ID (only Admin)
router.put("/:id", auth, async (req, res) => {
  try {
    // check if the user is admin
    if (!req.payload.isAdmin)
      return res.status(400).send("Only admin can edit cards");

    // joi validation for body
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    // edit the card in db
    let card = await Card.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!card) return res.status(404).send("No such card");

    // send the updated card details
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Delete card by its ID (isAdmin Only)
router.delete("/:id", auth, async (req, res) => {
  try {
    // check if the user is admin
    if (!req.payload.isAdmin)
      return res.status(400).send("Only admin can delete cards");
    // Delete Card from DB
    let card = await Card.findOneAndRemove({ _id: req.params.id });
    if (!card) return res.status(404).send("No such card");
    res.status(200).send("Card Removed Successfully!");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
