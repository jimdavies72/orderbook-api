const { Router } = require("express");
const { 
  getCurrencyData, 
  
} = require("./currencyControllers");

const currencyRouter = Router();

currencyRouter.get("/currency", getCurrencyData);

module.exports = currencyRouter;