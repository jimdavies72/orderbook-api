const Test = require("./testModel");
const { fakeTestData } = require("../db/fixtures");
const supertest = require("supertest");

const { 
  dbConnect, 
  dbDisconnect 
} = require("../db/testConnection");

// beforeAll(async () => {
//   await dbConnect();
// });
// afterAll(async () => {
//   await dbDisconnect();
// });

describe("Test Controllers", () => {
  describe("given the user is adding a new test string", () => {
    describe("when the string is added then", () => {
      it("should respond with 200 and the test string", async () => {

      });
    });
  });
    

})