const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  addComment
} = require("./commentControllers");

const commentRouter = Router();

//containerRouter.use("*", validateAccessToken);

// add
commentRouter.post("/comments", addComment);
// get
//containerRouter.get("/containers", getContainerList);
//containerRouter.put("/containers", getContainer);
//update
//containerRouter.put("/containers/update", updateContainer);
//delete ...

module.exports = commentRouter;