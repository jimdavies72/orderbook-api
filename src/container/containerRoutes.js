const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  getContainers, 
  addContainer, 
  updateContainer
} = require("./containerControllers");

const containerRouter = Router();

containerRouter.use("*", validateAccessToken);

// add
containerRouter.post("/containers", addContainer);
// get
containerRouter.patch("/containers", getContainers);
//update
containerRouter.put("/containers/update", updateContainer);
//TODO: delete route ...

module.exports = containerRouter;