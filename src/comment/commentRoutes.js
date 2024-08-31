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

// add
commentRouter.post("/comments", validateAccessToken, addComment);
// get
commentRouter.patch("/comments", validateAccessToken, getComments);
//update
commentRouter.put("/comments/update", validateAccessToken, updateComment);
//delete
commentRouter.put(
  "/comments/delete",
  validateAccessToken,
  allowDeleteComment,
  deleteComment
);

module.exports = commentRouter;