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

orderRouter.use("*", validateAccessToken);

// add
orderRouter.post("/orders", addOrder);
// get
orderRouter.patch("/orders", getOrders);
//update
orderRouter.put("/orders/update", updateOrder);
//delete
orderRouter.put("/orders/delete", allowDeleteOrder, deleteOrder);

module.exports = orderRouter;