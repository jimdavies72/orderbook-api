const mongoose = require("mongoose");
const { Order } = require("../order/orderModel");
const { Comment } = require("../comment/commentModel");

const containerSchema = new mongoose.Schema({
  containerId: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Order,
    },
  ],
  value: {
    type: Number,
    required: true,
  },
  full: {
    type: Boolean,
    default: false,
  },
  containerNumber: {
    type: String,
  },
  vesselDetails: {
    type: String,
  },
  sailingDate: {
    type: Date,
  },
  etaUKPort: {
    type: Date,
  },
  etaPort: {
    type: Date,
  },
  bookedIn: {
    type: Date,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Comment,
    },
  ],
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

const Container = mongoose.model("Container", containerSchema);

module.exports = Container;