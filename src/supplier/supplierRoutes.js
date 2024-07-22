const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const { 
  getSupplier,
  getAbridgedSupplierList, 
  getSupplierList, 
  addSupplier, 
  updateSupplier 
} = require('./supplierControllers');

const supplierRouter = Router();

//supplierRouter.use("*", validateAccessToken);

// add
supplierRouter.post("/suppliers", addSupplier);
// get
supplierRouter.get("/suppliers", getAbridgedSupplierList)
supplierRouter.patch("/suppliers", getSupplierList);
supplierRouter.put("/suppliers", getSupplier);
//update
supplierRouter.put("/suppliers/update", updateSupplier);
//delete ...

module.exports = supplierRouter;