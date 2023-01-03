const express = require("express");
const giftRouter = express.Router();
const Gift = require("../model/giftModel");

// Create a new gift
giftRouter.post("/create", async (req, res) => {
  try {
    const gift = new Gift(req.body);
    await gift.save();
    res.status(201).send(gift);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all gifts
giftRouter.get("/", async (req, res) => {
  try {
    const gifts = await Gift.find({});
    res.send(gifts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a gift by ID
giftRouter.get("/:id", async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) {
      return res.status(404).send();
    }
    res.send(gift);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a gift by ID
giftRouter.patch("/:id", async (req, res) => {
  try {
    const gift = await Gift.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!gift) {
      return res.status(404).send();
    }
    res.send(gift);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a gift by ID
giftRouter.delete("/:id", async (req, res) => {
  try {
    const gift = await Gift.findByIdAndDelete(req.params.id);
    if (!gift) {
      return res.status(404).send();
    }
    res.send(gift);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = giftRouter;
