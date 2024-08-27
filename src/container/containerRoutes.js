const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  getContainers, 
  addContainer, 
  updateContainer,
  deleteContainer
} = require("./containerControllers");

const { allowDeleteContainer } = require("../middleware");

const containerRouter = Router();

containerRouter.use("*", validateAccessToken);

// add
containerRouter.post("/containers", addContainer);
// get
containerRouter.patch("/containers", getContainers);
//update
containerRouter.put("/containers/update", updateContainer);
//delete
containerRouter.put("/containers/delete", allowDeleteContainer, deleteContainer);

module.exports = containerRouter;