const mongoose = require("mongoose");
const { Schema } = mongoose;

const reminderSchema = new Schema({
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "Supplier"
  },
  reminder: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
  }
}, 
{ timestamps: true });

const Reminder = mongoose.model.Reminder || mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;
