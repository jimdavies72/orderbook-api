const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  addAppSettings,
  getAppSettings,
  getPublicSettings,
  updateAppSettings,
} = require("./appSettingControllers");

const appSettingRouter = Router();

// public routes
// get
appSettingRouter.put("/appsetting", getPublicSettings);

// private routes
// add
appSettingRouter.post("/appsetting", validateAccessToken, addAppSettings);
// get
appSettingRouter.patch("/appsetting", validateAccessToken, getAppSettings);
//update
appSettingRouter.put("/appsetting/update", validateAccessToken, updateAppSettings);

module.exports = appSettingRouter;
