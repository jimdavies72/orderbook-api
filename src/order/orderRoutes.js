const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  addOrder,
  getOrders,
  updateOrder
} = require("./orderControllers");

const orderRouter = Router();

orderRouter.use("*", validateAccessToken);

// add
orderRouter.post("/orders", addOrder);
// get
orderRouter.patch("/orders", getOrders);
//update
orderRouter.put("/orders/update", updateOrder);
//delete ...

module.exports = orderRouter;