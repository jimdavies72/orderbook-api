const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const { 
  addListData,
  getCurrencyData, 
  getListData,
  updateListData,
} = require("./currencyControllers");

const currencyRouter = Router();

// add - admin function - population only, no user access.
currencyRouter.post("/currency", validateAccessToken, addListData);

// get
currencyRouter.put("/currency", validateAccessToken, getCurrencyData);
currencyRouter.patch("/currency", validateAccessToken, getListData);

// TODO: updateCurrencyData - admin function - refresh data if currency data is added or
// removed from the origin API
currencyRouter.put("/currency/update", validateAccessToken, updateListData);

module.exports = currencyRouter;
