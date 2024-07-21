const mongoose = require("mongoose");
const { Schema } = mongoose;

const containerSchema = new Schema({
  supplier: { 
    type: Schema.Types.ObjectId, 
    ref: "Supplier" 
  },
  containerId: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  full: {
    type: Boolean,
    default: false,
  },
  containerNumber: {
    type: String,
    required: false,
  },
  vesselDetails: {
    type: String,
    required: false,
  },
  sailingDate: {
    type: Date,
    required: false,
  },
  etaUKPort: {
    type: Date,
    required: false,
  },
  etaPort: {
    type: Date,
    required: false,
  },
  bookedIn: {
    type: Date,
    required: false,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  copyDocsRec: {
    type: String,
    required: true,
    enum: ["Y", "N", "N/A"],
    default: "Y",
  },
  plasticTaxDocsRec: {
    type: String,
    required: true,
    enum: ["Y", "N", "N/A"],
    default: "N/A",
  },
  docsToMe: {
    type: String,
    required: true,
    enum: ["Y", "N", "N/A"],
    default: "Y",
  },
  contListSaved: {
    type: String,
    required: true,
    enum: ["Y", "N", "N/A"],
    default: "Y",
  },
});

const Container = mongoose.model.Container || mongoose.model("Container", containerSchema);

module.exports = Container;