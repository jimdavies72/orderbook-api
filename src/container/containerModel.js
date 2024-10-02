const mongoose = require("mongoose");
const { Schema } = mongoose;

const containerSchema = new Schema(
  {
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
    // internal container id NOT the doc _id from mongo
    supplierContainerNumber: {
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
    shippingContainerNumber: {
      type: String,
      required: false,
    },
    vesselName: {
      type: String,
      required: false,
    },
    shippingRoute: {
      type: String,
      required: false,
    },
    destinationPort: {
      type: String,
      required: false,
    },
    stuffingDate: {
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
    bookedInDate: {
      type: Date,
      required: false,
    },
    bookedInSlot: {
      type: String,
      required: false,
    },
    copyDocsReceived: {
      type: String,
      required: true,
      enum: ["Y", "N", "N/A"],
      default: "Y",
    },
    plasticTaxDocsReceived: {
      type: String,
      required: true,
      enum: ["Y", "N", "N/A"],
      default: "N/A",
    },
    docsToFinance: {
      type: String,
      required: true,
      enum: ["Y", "N", "N/A"],
      default: "Y",
    },
    // TODO: containerListSaved will be replaced with a view for warehouse
    contListSaved: {
      type: String,
      required: true,
      enum: ["Y", "N", "N/A"],
      default: "Y",
    },
    addedToShippingForecast: {
      type: Boolean,
      default: false,
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

const Container = mongoose.model.Container || mongoose.model("Container", containerSchema);

module.exports = Container;