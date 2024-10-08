require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
  try {
    const currentEnv = process.env.NODE_ENV || 'production';

    console.log(`Environment: ${currentEnv}`);

    if (currentEnv === "production" || currentEnv === "development") {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to: orderbook DB');
    }

  } catch (error) {
    console.log(error.message);
  }
};

connection();
