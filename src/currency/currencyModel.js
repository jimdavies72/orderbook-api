const mongoose = require("mongoose");
const { Schema } = mongoose;

const currencySchema = new Schema(
  {
    unselected: {
      type: [],
    },
    selected: {
      type: [],
    },
    updatedBy: {
    type: String,
    },
  },
  { timestamps: true }
);

const Currency =
  mongoose.model.Currency || mongoose.model("Currency", currencySchema);

module.exports = Currency;
