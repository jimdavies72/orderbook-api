const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const { 
  getSupplierSummary, 
  getSuppliers, 
  addSupplier, 
  updateSupplier,
  deleteSupplier
} = require('./supplierControllers');

const {
  allowDeleteSupplier
} = require("../middleware");

const supplierRouter = Router();

supplierRouter.use("*", validateAccessToken);

// add
supplierRouter.post("/suppliers", addSupplier);
// get
supplierRouter.put("/suppliers", getSupplierSummary);
supplierRouter.patch("/suppliers", getSuppliers);
//update
supplierRouter.put("/suppliers/update", updateSupplier);
// delete route
supplierRouter.put("/suppliers/delete", allowDeleteSupplier, deleteSupplier);

module.exports = supplierRouter;