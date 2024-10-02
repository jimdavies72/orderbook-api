const Order = require("./orderModel");
const Container = require("../container/containerModel");
const { isRo } = require("../utils/helperFunctions"); 

exports.getOrders = async (req, res) => {
  try {
    let filter ={}
    if (req.body.filterKey) {
      filter = { [req.body.filterKey]: req.body.filterValue }
    }

    const orders = await Order.find(filter)
      .populate("supplier", "-_id name")
      .populate("comments", "-order");
    
    if (!isRo(orders)) {
      return res.status(404).send({ title: "Orders", message: "Order(s) not found" });   
    }

    res.status(200).send({count: orders.length, orders });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
}
exports.addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    if (!isRo(order)) {
      return res.status(400).send({ title: "Orders", message: "The order was not added"});
    }

    const container = await Container.findById({ _id: order.container });
    container.orders.push(order);
    await container.save();

    res.status(201).send({ title: "Orders", message: "The order was added successfully" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { [req.body.filterKey]: req.body.filterValue },
      {
        $set: req.body.order,
      }
    );

    if (!isRo(order)) {
      return res.status(404).send({ title: "Orders", message: "The order was not updated" });
    }

    res.status(200).send({ title: "Orders", message: "The order was updated successfully" });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.deleteOrder = async (req, res) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const order = await Order.deleteOne(filter);
    
    if (order.deletedCount > 0) {
      return res.status(200).send({ title: "Orders", message: "The order was deleted successfully" });
    }

    res.status(404).send({ title: "Orders", message: "The order was not deleted" });

  } catch (error) {
    res.st;atus(500).send({ error: error.message });
  };
};