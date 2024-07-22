const Order = require("./orderModel");
const Container = require("../container/containerModel"); 

exports.getOrders = async (req, res) => {
  try {
    
    let filter ={}
    if (req.body.filterKey) {
      filter = { [req.body.filterKey]: req.body.filterValue }
    }

    const orders = await Order.find(filter)
      .populate("supplier", "-_id name")
      .populate("comments", "-_id");
    
    if (!orders) {
      return res.status(404).send({ message: "orders not found" });   
    }

    res.status(200).send({ orders });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
exports.addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    if (!order) {
      return res.status(404).send({ message: "order could not be added" });
    }

    const container = await Container.findById({ _id: order.container });
    container.orders.push(order);
    await container.save();

    res.status(201).send({ order });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
  const order = await Order.findOneAndUpdate(
    { [req.body.filterKey]: req.body.filterValue },
    {
      $set: req.body.order,
    }
  );

  if (!order) {
    return res.status(404).send({ message: "order not found" });
  }

  res.status(200).send({ message: "order updated successfully" });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};