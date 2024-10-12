const Container = require("../containerModel");
const { fakeContainerData } = require("../../db/fixtures");

const {
  dbConnect,
  dbDisconnect
} = require("../../db/testConnection");

const {
  validateNotEmpty,
  validateStringEquality,
  validateMongoDuplicationError,
  validateCrudOperation,
} = require("../../utils/test-utils/validators.utils");


beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {  
  await dbDisconnect();
});

describe("Container Model", () => {
  describe("given a user is creating a new container", () => {
    describe("when a new record is saved then", () => {
      it("should validate saving a new container record successfully", async () => {
        // arrange
        const validContainerRecord = new Container(fakeContainerData);
        
        //act
        const savedContainerRecord = await validContainerRecord.save();
        const recCount = await Container.countDocuments();

        //assert
        validateNotEmpty(savedContainerRecord._id);
        validateStringEquality(
          savedContainerRecord.supplier.toString(), 
          fakeContainerData.supplier
        );
        validateStringEquality(
          savedContainerRecord.supplierContainerNumber, 
          fakeContainerData.supplierContainerNumber
        );
        validateStringEquality(
          savedContainerRecord.complete, 
          fakeContainerData.complete
        );
        validateStringEquality(
          savedContainerRecord.full, 
          fakeContainerData.full
        );
        validateStringEquality(
          savedContainerRecord.addedToShippingForecast,
          fakeContainerData.addedToShippingForecast
        );
        validateStringEquality(
          savedContainerRecord.value, 
          fakeContainerData.value
        );
        validateStringEquality(
          savedContainerRecord.shippingContainerNumber, 
          fakeContainerData.shippingContainerNumber
        );
        validateStringEquality(
          savedContainerRecord.vesselName, 
          fakeContainerData.vesselName
        );
        validateStringEquality(
          savedContainerRecord.shippingRoute,
          fakeContainerData.shippingRoute
        );
        validateStringEquality(
          savedContainerRecord.destinationPort,
          fakeContainerData.destinationPort
        );
        validateStringEquality(
          savedContainerRecord.stuffingDate.toISOString(),
          fakeContainerData.stuffingDate
        );
        validateStringEquality(
          savedContainerRecord.sailingDate.toISOString(),
          fakeContainerData.sailingDate
        );
        validateStringEquality(
          savedContainerRecord.etaUKPort.toISOString(),
          fakeContainerData.etaUKPort
        );
        validateStringEquality(
          savedContainerRecord.bookedInDate.toISOString(),
          fakeContainerData.bookedInDate
        );
        validateStringEquality(
          savedContainerRecord.bookedInSlot,
          fakeContainerData.bookedInSlot
        );
        validateStringEquality(
          savedContainerRecord.copyDocsReceived,
          fakeContainerData.copyDocsReceived
        );
        validateStringEquality(
          savedContainerRecord.plasticTaxDocsReceived,
          fakeContainerData.plasticTaxDocsReceived
        );
        validateStringEquality(
          savedContainerRecord.docsToFinance,
          fakeContainerData.docsToFinance
        );
        validateStringEquality(
          savedContainerRecord.contListSaved,
          fakeContainerData.contListSaved
        );
        validateStringEquality(
          savedContainerRecord.createdBy,
          fakeContainerData.createdBy
        );

        expect(recCount).toEqual(1);

      });
    });

    describe("when a container record is read then", () => {
      it("should validate reading a container record successfully", async () => {
        // arrange
        expect.assertions(5);
        const searchCriteria = {
          supplierContainerNumber: fakeContainerData.supplierContainerNumber,
        };

        //act
        const readContainerRecord = await Container.findOne(searchCriteria);

        //assert
        validateCrudOperation(readContainerRecord);

      });
    });

    describe("when a duplicated container record is saved then", () => {
      it("should validate MongoError duplicate error with code 11000", async () => {
        // arrange
        expect.assertions(5);
        const validContainerRecord = new Container(fakeContainerData);

        //act
        try {
          await validContainerRecord.save();
          
        } catch (err) {
          const recCount = await Container.countDocuments();

          //assert
          validateMongoDuplicationError(err.name, err.code);

          expect(recCount).toEqual(1);

        };
      });
    });

    describe("when a container record is updated then", () => {
      it("should validate updating a container record successfully", async () => {
        // arrange
        const updatedContainerData = {
          destinationPort: "updated destination port",
        };

        //act
        const updatedContainerRecord = await Container.findOneAndUpdate(
          { supplierContainerNumber: fakeContainerData.supplierContainerNumber },
          { $set: updatedContainerData },
          { new: true }
        );

        const recCount = await Container.countDocuments();

        //assert
        validateStringEquality(
          updatedContainerRecord.destinationPort,
          updatedContainerData.destinationPort
        );
        
        expect(recCount).toEqual(1);

      });
    });

    describe("when a container record is deleted then", () => {
      it("should validate deleting a container record successfully", async () => {
        // arrange
        expect.assertions(6);
        const searchCriteria = {
          supplierContainerNumber: fakeContainerData.supplierContainerNumber,
        };

        //act 
        const deletedContainerRecord = await Container.findOneAndDelete(searchCriteria);

        const recCount = await Container.countDocuments();

        //assert
        validateCrudOperation(deletedContainerRecord);

        expect(recCount).toEqual(0);

      });
    });
  });
});
