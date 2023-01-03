const mongoose = require("mongoose");
const GiftSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  gift_type: {
    gift_name: {
      type: String,
      required: true,
    },
    diamond_count: {
      type: String,
      required: true,
    },
    action_type: {
      type: String,
      required: true,
    },
  },
});

const Gift = mongoose.model("Gift", GiftSchema);

module.exports = Gift;
