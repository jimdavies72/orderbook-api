const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSchema = new Schema({
  testString: {
    type: String,
    required: true
  }
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
