const mongoose = require("mongoose");
const { Schema } = mongoose;

const containerSchema = new Schema({
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "Supplier",
  },
  // internal container id NOT the doc _id from mongo
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
  stuffindDate: {
    type: Date,
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
  bookedIn: {
    type: Date,
    required: false,
  },
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
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
  },
}, 
{ timestamps: true });

const Container = mongoose.model.Container || mongoose.model("Container", containerSchema);

module.exports = Container;