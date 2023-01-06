const mongoose = require("mongoose");
const Gift = require("./giftModel");
//create a model having fileds name

const TiktokUserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
          v
        );
      },
      message: "{VALUE} is not a valid URL!",
    },
  },
  gift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gift",
    required: true,
  },
});

const TiktokUser = mongoose.model("TiktokUser", TiktokUserSchema);

module.exports = TiktokUser;

/* You can define it as followed

******code*******
const mongoose = require('mongoose');
const GiftType = require('./GiftType');

const GiftSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TiktokUser'
  },
  type: {
    type: String,
    required: true
  },
  gift_type: {
    type: GiftType,
    required: true
  }
});

const Gift = mongoose.model('Gift', GiftSchema);

module.exports = Gift;


---end of code---


*/
