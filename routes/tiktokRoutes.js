const expressAsyncWrapper = require("express-async-wrapper");
const tiktokController = require("../controller/userController");
const tiktokRouter = require("express").Router();

tiktokRouter.get("/all/users",tiktokController.getAllTiktokUsers)
tiktokRouter.get("/search/user",tiktokController.searchTIktokUser)
tiktokRouter.get("/user/:id",tiktokController.getTiktokUserById)
tiktokRouter.post("/create/user",tiktokController.addTiktokUser)
tiktokRouter.patch("/update/user/:id",tiktokController.updateTiktokUserById)
tiktokRouter.delete("/user",tiktokController.deleteTiktokUser)

module.exports = tiktokRouter;
