require("./db/connection");
const { createServer } = require("../src/utils/createServer");
const port = process.env.PORT || 5001;

const app = createServer();
// goto ./src/utils/createServer.js to add new routes

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
