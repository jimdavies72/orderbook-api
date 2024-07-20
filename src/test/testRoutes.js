const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");
const { addTestString, getTestStrings } = require("./testControllers");

const testRouter = Router();

testRouter.get("/test", getTestStrings);
testRouter.put("/test", validateAccessToken, getTestStrings);
testRouter.post("/test", validateAccessToken, addTestString);

module.exports = testRouter;
