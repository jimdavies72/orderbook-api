const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { properString } = require("../utils/helperFunctions");
const { connectionState } = require("../db/fixtures");

const mongoServer = new MongoMemoryServer();

exports.dbConnect = async () => {
  await mongoServer.start();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log(`Mock DB State: ${properString(connectionState[mongoose.connection.readyState])}\n`);
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

