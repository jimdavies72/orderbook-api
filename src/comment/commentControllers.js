const Supplier = require("../supplier/supplierModel");

exports.addComment = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.body._id);

    if (!supplier) {
      res.status(404).send({ error: "supplier not found" });
      return;
    }

    await supplier.comments.push(req.body.data);
    const data = await supplier.save();
    console.log(comment)
    if (!comment) {
      res.status(404).send({ error: "comment could not be added" });
      return;
    }
    res.status(201).send({ data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};