const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  getContainerList, 
  getContainer, 
  addContainer, 
  updateContainer
} = require("./containerControllers");

const containerRouter = Router();

//containerRouter.use("*", validateAccessToken);

// add
containerRouter.post("/containers", addContainer);
// get
containerRouter.get("/containers", getContainerList);
containerRouter.put("/containers", getContainer);
//update
containerRouter.put("/containers/update", updateContainer);
//delete ...

module.exports = containerRouter;