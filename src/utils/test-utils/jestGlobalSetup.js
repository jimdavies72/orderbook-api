const {
  startMockAuth0Server,
  stopMockAuth0Server,
} = require("../../utils/test-utils/mockAuthServer/mockAuth");

module.exports = async () => {
  try {
    console.log("\n*** Tests Begin ***\n");

    await startMockAuth0Server();
    console.log("Mock Auth0 Server Started");
  
  } catch (error) {
    console.log(error.message);
    await stopMockAuth0Server();
  }
};
