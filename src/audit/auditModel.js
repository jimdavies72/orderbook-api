const mongoose = require("mongoose");
const { Schema } = mongoose;

const auditSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
    },
    identifier: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Audit = mongoose.model.Audit || mongoose.model("Audit", auditSchema);

module.exports = Audit;