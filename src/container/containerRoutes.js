const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  getContainers,
  getBookedInDates, 
  addContainer, 
  updateContainer,
  deleteContainer
} = require("./containerControllers");

const { allowDeleteContainer } = require("../middleware");

const containerRouter = Router();

// add
containerRouter.post("/containers", validateAccessToken, addContainer);
// get
containerRouter.patch("/containers", validateAccessToken, getContainers);
containerRouter.patch("/containers/delivery", validateAccessToken, getBookedInDates);
//update
containerRouter.put("/containers/update", validateAccessToken, updateContainer);
//delete
containerRouter.put(
  "/containers/delete",
  validateAccessToken,
  allowDeleteContainer,
  deleteContainer
);

module.exports = containerRouter;