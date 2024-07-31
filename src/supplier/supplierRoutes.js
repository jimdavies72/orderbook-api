const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const { 
  getSupplierSummary, 
  getSuppliers, 
  addSupplier, 
  upsertSupplier 
} = require('./supplierControllers');

const supplierRouter = Router();

supplierRouter.use("*", validateAccessToken);

// add
supplierRouter.post("/suppliers", addSupplier);
// get
supplierRouter.get("/suppliers", getSupplierSummary);
supplierRouter.patch("/suppliers", getSuppliers);
//update
supplierRouter.put("/suppliers/update", upsertSupplier);
//TODO: delete route...

module.exports = supplierRouter;