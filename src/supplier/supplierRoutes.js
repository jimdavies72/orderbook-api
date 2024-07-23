const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const { 
  getSupplier,
  getAbridgedSupplierList, 
  getSuppliers, 
  addSupplier, 
  updateSupplier 
} = require('./supplierControllers');

const supplierRouter = Router();

//TODO: enable supplierRouter token validation
//supplierRouter.use("*", validateAccessToken);

// add
supplierRouter.post("/suppliers", addSupplier);
// get
supplierRouter.get("/suppliers", getAbridgedSupplierList)
supplierRouter.patch("/suppliers", getSuppliers);
//update
supplierRouter.put("/suppliers/update", updateSupplier);
//TODO: delete route...

module.exports = supplierRouter;