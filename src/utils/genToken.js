require("dotenv").config();
const request = require("request");

const options = {
  method: "POST",
  url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
  headers: { "content-type": "application/json" },
  body: `{"client_id":"${process.env.AUTH0_CLIENT_ID}",
  "client_secret":"${process.env.AUTH0_CLIENT_SECRET}",
  "audience":"${process.env.AUTH0_AUDIENCE}",
  "grant_type":"${process.env.AUTH0_GRANT_TYPE}"}`,
};
request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
  console.log(body);
});

