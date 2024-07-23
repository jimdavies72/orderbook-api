const Supplier = require("./supplierModel");
const Container = require("../container/containerModel");
const { popOptions } = require("../utils/helperFunctions");


exports.getAbridgedSupplierList = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}, "_id supplierId name");
    
    if (suppliers.length === 0) {
      return res.status(404).send({ count: 0, suppliers });
    };
    
    const containers = await Container.aggregate([{ "$match": {"complete": false}}]).group({
      _id: "$supplier",
      count: { $sum: 1 }
    });
    
    const abridgedSupplierList = suppliers.map((supplier) => {
      const count = containers.find((c) => c._id.toString() === supplier._id.toString());

      let object = {
        supplierId: supplier.supplierId,
        name: supplier.name,
      };

      if (count) {
        object = { ...object, activeContainerCount: count.count}
      } else {
        object = { ...object, activeContainerCount: 0 };
      }

      return object;

    });

    res.status(200).send({ count: suppliers.length, suppliers: abridgedSupplierList });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    let filter = {};
    if (req.body.filterKey) {
      filter = { [req.body.filterKey]: req.body.filterValue };
    };

    const commentOptions = popOptions(
      "containers",
      req.body.includeComplete,
      ["supplier"],
      { path: "comments", select: "-container" }
    );

    const orderOptions = popOptions(
      "containers",
      req.body.includeComplete,
      ["supplier"],
      { path: "orders", select: "-container", populate: { path: "comments", select: "-order" } }
    );

    const suppliers = await Supplier.find(filter).populate(commentOptions).populate(orderOptions);

    let key = "";
    if (suppliers.length === 0) {
      return res.status(404).send({ count: 0, suppliers });
    } else if (suppliers.length === 1) {
      key = "supplier"
    } else {
      key = "suppliers"
    };

    res.status(200).send({ count: suppliers.length, [key]: suppliers });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);

    res.status(201).send({ supplier });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndUpdate(
      { [req.body.filterKey]: req.body.filterValue },
      { name: req.body.supplier.name },
      { new: true }
    );

    if (!supplier) {
      return res.status(404).send({ message: "supplier not found" });
    }

    const supplierData = {
      supplierId: supplier.supplierId,
      name: supplier.name,
    }

    res.status(200).send({ supplier: supplierData });
  
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

