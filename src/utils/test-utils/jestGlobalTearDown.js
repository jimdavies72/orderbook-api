const {
  stopMockAuth0Server,
} = require("../../utils/test-utils/mockAuthServer/mockAuth");

const { dbDisconnect } = require("../../db/testConnection");

module.exports = async () => {
  try {
    await stopMockAuth0Server();
    console.log("\nMock Auth0 Server Stopped");

    await dbDisconnect();
    console.log("Mock DB Stopped");

  } catch (error) {
    console.log(error.message);

  } finally {
    console.log("\n*** Tests End ***\n");
  };
};
