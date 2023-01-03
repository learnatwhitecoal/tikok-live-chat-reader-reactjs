const expressAsyncWrapper = require("express-async-wrapper");
//expressAsyncWrapper(async(req,res)=>{

//})
const TiktokUser = require("../model/tiktokModel");
const tiktokController = {
  saveActiveUser: expressAsyncWrapper(async (req, res) => {
    res.json({
      message: "saved active user",
    });
  }),
  // Create a new Tiktok user
  addTiktokUser: expressAsyncWrapper(async (req, res) => {
    const tiktokUser = new TiktokUser(req.body);
    await tiktokUser.save();
    res.status(201).send(tiktokUser);
  }),

  // Get all Tiktok users
  getAllTiktokUsers: expressAsyncWrapper(async (req, res) => {
    const tiktokUsers = await TiktokUser.find({});
    res.send(tiktokUsers);
  }),
  getTiktokUserById: expressAsyncWrapper(async (req, res) => {
    const tiktokUser = await TiktokUser.findById(req.params.id);
    if (!tiktokUser) {
      return res.status(404).send();
    }
    res.send(tiktokUser);
  }),
  updateTiktokUserById: expressAsyncWrapper(async (req, res) => {
    const tiktokUser = await TiktokUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tiktokUser) {
      return res.status(404).send();
    }
    res.send(tiktokUser);
  }),

  // Search Tiktok users by username and by gift count
  searchTIktokUser: async (req, res) => {
    try {
      const { username, giftCount } = req.query;
      let tiktokUsers;

      if (username && giftCount) {
        // Search by username and by gift count
        tiktokUsers = await TiktokUser.find({
          username: { $regex: new RegExp(`^${username}$`, "i") },
          "gift.gift_type.diamond_count": giftCount,
        });
      } else if (username) {
        // Search by username only
        tiktokUsers = await TiktokUser.find({
          username: { $regex: new RegExp(`^${username}$`, "i") },
        });
      } else if (giftCount) {
        // Search by gift count only
        tiktokUsers = await TiktokUser.find({
          "gift.gift_type.diamond_count": giftCount,
        });
      } else {
        // Return all Tiktok users
        tiktokUsers = await TiktokUser.find({});
      }

      res.send(tiktokUsers);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  deleteTiktokUser: expressAsyncWrapper(async (req, res) => {
    const tiktokUser = await TiktokUser.findByIdAndDelete(req.params.id);
    if (!tiktokUser) {
      return res.status(404).send();
    }
    res.send(tiktokUser);
  }),
};

module.exports = tiktokController;
