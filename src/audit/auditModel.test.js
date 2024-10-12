const Audit = require("./auditModel");
const { fakeAuditData } = require("../db/fixtures");

const {
  dbConnect,
  dbDisconnect
} = require("../db/testConnection");

const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
} = require("../utils/test-utils/validators.utils");


beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {  
  await dbDisconnect();
});

describe("Audit Model", () => {
  describe("given a user is performing an auditable action in the app", () => {
    describe("when the action is completed then", () => {
      it("should validate saving a new audit record successfully", async () => {
        // arrange
        const validAuditRecord = new Audit(fakeAuditData);
        
        //act
        const savedAuditRecord = await validAuditRecord.save();

        //assert
        validateNotEmpty(savedAuditRecord._id);
        validateStringEquality(savedAuditRecord.model, fakeAuditData.model);
        validateStringEquality(savedAuditRecord.action, fakeAuditData.action);
        validateStringEquality(savedAuditRecord.reason, fakeAuditData.reason);
        validateStringEquality(savedAuditRecord.userId, fakeAuditData.userId);
        validateStringEquality(
          savedAuditRecord.createdBy,
          fakeAuditData.createdBy
        );
      });
    });
    // describe("when a duplicated audit record is saved then", () => {
    //   it("should validate MongoError duplicate error with code 11000", async () => {
    //     // arrange
    //     expect.assertions(4);
    //     const validAuditRecord = new Audit(fakeAuditData);

    //     //act
    //     try {
    //       await validAuditRecord.save();
    //     } catch (err) {
    //       //assert
    //       validateMongoDuplicationError(err.name, err.code);
    //     };
    //   });
    // });
  });
});
