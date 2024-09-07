const Supplier = require("../supplier/supplierModel");
const Container = require("../container/containerModel");
const Order = require("../order/orderModel");
const Comment = require("../comment/commentModel");
const Reminder = require("../reminders/reminderModel");

exports.allowDeleteSupplier = async (req, res, next) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const supplier = await Supplier.find(filter);

    if (supplier.length === 0) {
      return res
        .status(404)
        .send({
          title: "Supplier not found",
          message: "The supplier was not deleted",
        });
    }

    const containers = await Container.find({ supplier: req.body.filterValue})

    if (containers.length > 0) {
      return res
        .status(400)
        .send({
          title: "Warning: Supplier has containers",
          message: "The supplier cannot be deleted",
        });
    };

    next();

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.allowDeleteContainer = async (req, res, next) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const container = await Container.find(filter);

    if (container.length === 0) {
      return res.status(404).send({
        title: "Container not found",
        message: "The container was not deleted",
      });
    };

    const orders = await Order.find({ container: req.body.filterValue });
    if (orders.length > 0) {
      return res.status(400).send({
        title: "Warning: Container has orders",
        message: "The container cannot be deleted",
      });
    };

    const comments = await Comment.find({ container: req.body.filterValue });
    if (comments.length > 0) {
      return res.status(400).send({
        title: "Warning: Container has comments attributed to it",
        message: "The container cannot be deleted",
      });
    };

    next();

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.allowDeleteOrder = async (req, res, next) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const order = await Order.find(filter);

    if (order.length === 0) {
      return res.status(404).send({
        title: "Order not found",
        message: "The order was not deleted",
      });
    }

    const comments = await Comment.find({ order: req.body.filterValue });

    if (comments.length > 0) {
      return res.status(400).send({
        title: "Warning: Order has comments attributed to it",
        message: "The order cannot be deleted",
      });
    }

    next();

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.allowDeleteComment = async (req, res, next) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const comment = await Comment.find(filter);

    if (comment.length === 0) {
      return res.status(404).send({
        title: "Comment not found",
        message: "The comment was not deleted",
      });
    };

    if (comment[0].userId !== req.body.userId ) { 
      //TODO: Add Admin check
      return res.status(400).send({
        title: "Comment owner mismatch",
        message: "Only the comment creator can delete the comment",
      });
    }

    next();

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.allowDeleteReminder = async (req, res, next) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const reminder = await Reminder.find(filter);

    if (reminder.length === 0) {
      return res.status(404).send({
        title: "Reminder not found",
        message: "The reminder was not deleted",
      });
    }

    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};