require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const rateLimit = require("express-rate-limit");

const { errorHandler } = require("../middleware/error.middleware");

const supplierRouter = require("../supplier/supplierRoutes");
const containerRouter = require("../container/containerRoutes");
const orderRouter = require("../order/orderRoutes");
const commentRouter = require("../comment/commentRoutes");
const testRouter = require("../test/testRoutes");

const unmatchedRouter = require("../unmatched/unmatchedRoutes");

let appLimit = 200;
if (process.env.NODE_ENV === "production") {
  appLimit = 20
}

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: appLimit, // each IP can make up to 30 requests per `windowsMs` (5 minutes)
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});

exports.createServer = () => {
  const app = express();
  app.use(express.json());

  app.use(logger("dev"));

  // security settings
  app.use(cors());
  app.use(helmet());
  app.use(hpp());
  app.use(limiter);
  
  app.use(testRouter);
  app.use(supplierRouter);
  app.use(containerRouter);
  app.use(orderRouter);
  app.use(commentRouter);
  //TODO: add new routes here:

  //error handler for invalid tokens
  app.use(errorHandler);
  
  //default for unmatched routes
  app.use(unmatchedRouter);
  
  app.use(csurf());
  
  return app;
};