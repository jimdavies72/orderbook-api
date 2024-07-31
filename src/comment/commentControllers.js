const Comment = require("./commentModel");
const Container = require("../container/containerModel");
const Order = require("../order/orderModel");

exports.getComments = async (req, res) => {
  try {
    let filter = {}
    if (req.body.filterKey) {
      filter = { [req.body.filterKey]: req.body.filterValue }
    }
  
    const comments = await Comment.find(filter).populate("container", "containerId").populate("order", "orderNumber");

    if (!comments) {
      res.status(404).send({ message: "comments not found" });
      return;
    }

    res.status(200).send({count: comments.length, comment: comments });
   
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);

    if (!comment) {
     return res.status(404).send({ message: "comment could not be added" });
    }

    if (req.body.container) {
      const container = await Container.findById({ _id: comment.container});
      container.comments.push(comment);
      await container.save();
    } else if (req.body.order) {
      const order = await Order.findById({ _id: comment.order});
      order.comments.push(comment);
      await order.save();
    } else {
      return res.status(404).send({ message: "comment parent not found" });
    }

    res.status(201).send({ message: "comment added successfully" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {

    const comment = await Comment.findOneAndUpdate(
      { [req.body.filterKey]: req.body.filterValue },
      { comment: req.body.comment, updatedBy: req.body.updatedBy },
    );

    if (!comment) {
      return res.status(404).send({ message: "comment not updated" });
    }

    res.status(200).send({ message: "comment updated successfully" });

    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
