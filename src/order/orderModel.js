const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    container: {
      type: Schema.Types.ObjectId,
      ref: "Container",
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    orderNumber: {
      type: String,
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
    unitCostPrice: {
      type: Number,
      required: true,
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
    ukRequiredDate: {
      type: Date,
      required: false,
    },
    orderPlacedDate: {
      type: Date,
      required: false,
    },
    orderReceivedBySupplier: {
      type: Boolean,
      default: false,
    },
    stuffingDate: {
      type: Date,
      required: false,
    },
    sample: {
      type: String,
      required: true,
      enum: ["X", "Y", "N", "N/A"],
      default: "X",
    },
    fabricColour: {
      type: String,
      required: true,
      enum: ["X", "Y", "N", "N/A"],
      default: "X",
    },
    artworkDrawing: {
      type: String,
      required: true,
      enum: ["X", "Y", "N", "N/A"],
      default: "X",
    },
    printOnBag: {
      type: String,
      required: true,
      enum: ["X", "Y", "N", "N/A"],
      default: "X",
    },
    artworkSaved: {
      type: String,
      required: true,
      enum: ["X", "Y", "N", "N/A"],
      default: "X",
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
  { timestamps: true, toJSON: { virtuals: true } }
);

orderSchema.virtual('orderValue').get(() => {
  if (this.unitCostPrice && this.quantity) {
    return this.quantity * this.unitCostPrice;
  } else {
    return 0
  }
});

orderSchema.virtual('totalWeight').get(() => {
  if (this.unitWeight && this.quantity) {
    return this.quantity * this.unitWeight;
  } else {
    return 0
  }
});

const Order = mongoose.model.Order || mongoose.model("Order", orderSchema);

module.exports = Order;