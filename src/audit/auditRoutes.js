const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const { addAudit, getAudits } = require("./auditControllers");

const auditRouter = Router();

auditRouter.use("*", validateAccessToken);

// add
auditRouter.post("/audit", addAudit);
// get
auditRouter.patch("/audit", getAudits);

module.exports = auditRouter;
