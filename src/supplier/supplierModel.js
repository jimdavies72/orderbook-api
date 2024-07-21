const mongoose = require("mongoose");
const { Schema } = mongoose;

const supplierSchema = new Schema({
  supplierId: {
    type: String,
    required: true,
    uppercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  containers: [{ type: Schema.Types.ObjectId, ref: "Container" }],
});

const Supplier = mongoose.model.Supplier || mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;