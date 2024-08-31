const { Router } = require('express');
const { respondUnmatched } = require("./unmatchedControllers");

const unmatchedRouter = Router()

unmatchedRouter.use("*", respondUnmatched);

module.exports = unmatchedRouter;