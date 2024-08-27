const Container = require("./containerModel");
const Order = require("../order/orderModel");
const Supplier = require("../supplier/supplierModel");
const { popOptions } = require("../utils/helperFunctions");

// const getSupplierName = async (supplier_id) => {
//   const supplier = await Supplier.findById(supplier_id);
  
//   if (!supplier) {
//     return null;
//   }
//   return supplier.name;
// };

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

    let key = ""
    if (containers.length === 0) {
      return res.status(404).send({ title: "containers not found", message: "No containers were found" });
    };

    res.status(200).send({count: containers.length, containers: containers});

  } catch (error) {
    res.status(500).send({ error: error.message }); 
  }
};

exports.addContainer = async (req, res) => {
  try {
    const container = await Container.create(req.body);
   
    if (!container) {
      return res.status(404).send({ message: "container could not be added" });
    }

    const supplier = await Supplier.findById({_id: container.supplier});
    supplier.containers.push(container);
    await supplier.save();

    res.status(201).send({ message: "container added successfully" });
     
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

    if (!container) {
      return res.status(404).send({ message: "container not found" });
    };

    res.status(200).send({ message: "container updated successfully" });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.deleteContainer = async (req, res) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const container = await Container.deleteOne(filter);
    
    if (container.deletedCount > 0) {
      return res.status(200).send({
        title: "Delete container",
        message: "The container was deleted successfully",
      });
    }

    res.status(404).send({
      title: "Something went wrong",
      message: "The container was not deleted",
    });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};