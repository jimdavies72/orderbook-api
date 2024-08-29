const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const { addAppSettings, getAppSettings, updateAppSettings } = require("./appSettingControllers");

const appSettingRouter = Router();

appSettingRouter.use("*", validateAccessToken);

// add
appSettingRouter.post("/appsetting", addAppSettings);
// get
appSettingRouter.patch("/appsetting", getAppSettings);
//update
appSettingRouter.put("/appsetting/update", updateAppSettings);

module.exports = appSettingRouter;
