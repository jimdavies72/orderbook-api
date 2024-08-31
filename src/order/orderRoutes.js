const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  addOrder,
  getOrders,
  updateOrder,
  deleteOrder
} = require("./orderControllers");

const { allowDeleteOrder } = require("../middleware");

const orderRouter = Router();

// add
orderRouter.post("/orders", validateAccessToken, addOrder);
// get
orderRouter.patch("/orders", validateAccessToken, getOrders);
//update
orderRouter.put("/orders/update", validateAccessToken, updateOrder);
//delete
orderRouter.put(
  "/orders/delete",
  validateAccessToken,
  allowDeleteOrder,
  deleteOrder
);

module.exports = orderRouter;