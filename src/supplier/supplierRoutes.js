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

// add
supplierRouter.post("/suppliers", validateAccessToken, addSupplier);
// get
supplierRouter.put("/suppliers", validateAccessToken, getSupplierSummary);
supplierRouter.patch("/suppliers", validateAccessToken, getSuppliers);
//update
supplierRouter.put("/suppliers/update", validateAccessToken, updateSupplier);
// delete route
supplierRouter.put("/suppliers/delete", validateAccessToken, allowDeleteSupplier,
  deleteSupplier
);

module.exports = supplierRouter;