const { OAuth2Server } = require("oauth2-mock-server");

let server = new OAuth2Server();

exports.startMockAuth0Server = async () => {
  
  // Generate a new RSA key and add it to the keystore
  await server.issuer.keys.generate('RS256');
  
  // Start the server
  await server.start(8080, 'localhost');
  console.log('Issuer URL:', server.issuer.url); // -> http://localhost:8080  
}

exports.stopMockAuth0Server = async () => {
  await server.stop();
}

exports.getMockToken = async () => {
  try {
    let token = await server.issuer.buildToken();
    return token;
  } catch (error) {
    console.log(error);
  };
};



