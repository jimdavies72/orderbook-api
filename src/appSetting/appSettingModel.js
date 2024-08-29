const mongoose = require("mongoose");
const { Schema } = mongoose;

const appSettingSchema = new Schema(
  {
    appId: {
      type: String,
      required: true,
      unique: true,
      immutable: true, // cannot be updated
    },
    companyName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AppSetting = mongoose.model.AppSetting || mongoose.model("AppSetting", appSettingSchema);

module.exports = AppSetting;