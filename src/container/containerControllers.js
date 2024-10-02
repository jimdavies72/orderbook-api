const Container = require("./containerModel");
const Supplier = require("../supplier/supplierModel");
const { popOptions } = require("../utils/helperFunctions");

exports.getContainers = async (req, res) => {
  try {
    const orderOptions = popOptions("orders", null, ["container"], {
      path: "comments",
      select: "-order",
    });

    let filter = {}
    if (req.body.filterKey) {
      filter = { [req.body.filterKey]: req.body.filterValue };
    };

    if (!req.body.includeComplete ){
      filter = {
        ...filter,
        complete : false,
      };
    };

    const containers = await Container.find(filter).populate("comments", "-container").populate(orderOptions).populate("supplier", "-_id name");

    if (!isRo(containers)) {
      return res.status(404).send({ title: "Containers", message: "No containers were found" });
    };

    res.status(200).send({ count: containers.length, containers: containers });

  } catch (error) {
    res.status(500).send({ error: error.message }); 
  };
};

exports.getBookedInDates = async (req, res) => {
  try {
    const bookedInDates = await Container.find({ bookedInDate: { $ne: null } }).select(
      " shippingContainerNumber bookedInDate bookedInSlot -_id"
    );

    if (!isRo(bookedInDates)) {
      return res.status(404).send({ title: "Booked in dates", message: "Booked in dates not found" });
    }

    res.status(200).send({ bookedInDates });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.addContainer = async (req, res) => {
  try {
    const container = await Container.create(req.body);
   
    if (!isRo(container)) {
      return res.status(400).send({ title: "Containers", message: "container could not be added" });
    }

    const supplier = await Supplier.findById({_id: container.supplier});
    supplier.containers.push(container);
    await supplier.save();

    res.status(201).send({ title: "Containers", message: "The container was added successfully" });
     
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateContainer = async (req, res) => {
  try {
    const container = await Container.findOneAndUpdate(
      { [req.body.filterKey]: req.body.filterValue },
      {
        "$set": req.body.data,
      },
    );

    if (!isRo(container)) {
      return res.status(404).send({ title: "Containers", message: "The container was not updated" });
    };

    res.status(200).send({ title: "Containers", message: "The container was updated successfully" });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.deleteContainer = async (req, res) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const container = await Container.deleteOne(filter);
    
    if (container.deletedCount > 0) {
      return res.status(200).send({ title: "Delete container", message: "The container was deleted successfully" });
    }

    res.status(404).send({ title: "Containers", message: "The container was not deleted" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};