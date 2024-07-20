const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  getSuppliersList, 
  getSupplier, 
  addSupplier, 
  updateSupplier
} = require("./supplierControllers");

const supplierRouter = Router();

//supplierRouter.use("*", validateAccessToken);

// add
supplierRouter.post("/suppliers", addSupplier);
// get
supplierRouter.put("/suppliers", getSuppliersList);
supplierRouter.patch("/suppliers", getSupplier);
//update
supplierRouter.put("/suppliers/update", updateSupplier);
//delete ...

module.exports = supplierRouter;