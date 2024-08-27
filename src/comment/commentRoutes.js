const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} = require("./commentControllers");

const { allowDeleteComment } = require("../middleware");

const commentRouter = Router();

commentRouter.use("*", validateAccessToken);

// add
commentRouter.post("/comments", addComment);
// get
commentRouter.patch("/comments", getComments);
//update
commentRouter.put("/comments/update", updateComment);
//delete
commentRouter.put("/comments/delete", allowDeleteComment, deleteComment);

module.exports = commentRouter;