const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  container: {
    type: Schema.Types.ObjectId,
    ref: "Container"
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "Supplier",
    required: true
  },
  orderNumber: {
    type: String,
    required: true,
  },
  forPurchasing: {
    type: Number,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
    uppercase: true,
  },
  customer: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  unitWeight: {
    type: Number,
    required: true,
    default: 0,
  },
  totalWeight: {
    type: Number,
    required: false,
    default: () => {
      if (this.unitWeight & this.quantity) {
        return this.quantity * this.unitWeight
      };
    },
  },
  ukRequiredDate: {
    type: Date,
    required: false,
  },
  orderPlacedDate: {
    type: Date,
    required: false,
  },
  orderReceived: {
    type: Boolean,
    default: false,
  },
  loaded: {
    type: Boolean,
    default: false,
  },
  sample: {
    type: String,
    required: true,
    enum: ["Y", "N", "N/A"],
    default: "N/A",
  },
  fabricColour: {
    type: String,
    required: true,
    enum: ["Y", "N", "N/A"],
    default: "N/A",
  },
  artworkDrawing: {
    type: String,
    required: true,
    enum: ["Y", "N", "N/A"],
    default: "N/A",
  },
  printOnBag: {
    type: String,
    required: true,
    enum: ["Y", "N", "N/A"],
    default: "N/A",
  },
  artworkSaved: {
    type: String,
    required: true,
    enum: ["Y", "N", "N/A"],
    default: "N/A",
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
  }
}, 
{ timestamps: true });

const Order = mongoose.model.Order || mongoose.model("Order", orderSchema);

module.exports = Order;