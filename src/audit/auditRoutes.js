const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const { addAudit, getAudits } = require("./auditControllers");

const auditRouter = Router();

// add
auditRouter.post("/audit", validateAccessToken, addAudit);
// get
auditRouter.patch("/audit", validateAccessToken, getAudits);

module.exports = auditRouter;
