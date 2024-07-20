const mongoose = require("mongoose");
const { Container } = require("../container/containerModel");

const supplierSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  containers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Container,
    },
  ],
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;