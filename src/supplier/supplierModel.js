const mongoose = require("mongoose");
const { Schema } = mongoose;

const supplierSchema = new Schema(
  {
    supplierId: {
      type: String,
      required: true,
      uppercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    updatedBy: {
      type: String,
    },
    createdBy: {
      type: String,
      required: true,
    },
    containers: [{ type: Schema.Types.ObjectId, ref: "Container" }],
    reminders: [{ type: Schema.Types.ObjectId, ref: "Reminder" }],
  },
  { timestamps: true }
);

const Supplier = mongoose.model.Supplier || mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;