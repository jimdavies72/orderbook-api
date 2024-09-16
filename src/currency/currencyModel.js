const mongoose = require("mongoose");
const { Schema } = mongoose;

const currencySchema = new Schema(
  {
    baseCurrencyDefault: {
      type: String,
    },
    currencyList: {
      type: [],
    },
    currenciesUsed: {
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
