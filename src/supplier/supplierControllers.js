const Supplier = require("./supplierModel");
const Container = require("../container/containerModel");
const Comments = require("../comment/commentModel");
const { popOptions } = require("../utils/helperFunctions");


exports.getAbridgedSupplierList = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}, "_id supplierId name");
    
    if (!suppliers || suppliers.length === 0) {
      return res.status(404).send({ supplierCount: 0 });
    }
    
    const containerCount = await Container.aggregate([{ "$match": {"complete": false}}]).group({
      _id: "$supplier",
      count: { $sum: 1 }
    });

    const abridgedSupplierList = suppliers.map((supplier) => {
      const count = containerCount.find((c) => c._id.toString() === supplier._id.toString());
      console.log(count.count)
      return {
        supplierId: supplier.supplierId,
        name: supplier.name,
        activeContainerCount: count.count
      }
    })

    res.status(200).send({ supplierCount: suppliers.length, abridgedSupplierList });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getSupplierList = async (req, res) => {
  try {
    const options = popOptions(
      "containers",
      req.body.includeComplete,
      ["supplier"],
      { path: "comments", select: "-container" }
    );
    const suppliers = await Supplier.find({}).populate(options);

    if (!suppliers || suppliers.length === 0) {
      return res.status(404).send({ count: 0, suppliers });
    }

    res.status(200).send({ count: suppliers.length, suppliers });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getSupplier = async (req, res) => {
  try {
    const options = popOptions(
      "containers",
      req.body.includeComplete,
      ["supplier"],
      { path: "comments", select: "-container" }
    );

    const supplier = await Supplier.find(
      { [req.body.filterKey]: req.body.filterValue },
      "supplierId name containers"
    ).populate(options);

    if (!supplier || supplier.length === 0) {
      return res.status(404).send({ message: "supplier not found" });
    }

    res.status(200).send({ count: supplier.length, supplier });
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

