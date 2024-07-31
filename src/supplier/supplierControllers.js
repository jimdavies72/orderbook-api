const mongoose = require("mongoose");
const Supplier = require("./supplierModel");
const Container = require("../container/containerModel");
const { popOptions } = require("../utils/helperFunctions");


exports.getSupplierSummary = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});

    if (suppliers.length === 0) {
      return res.status(404).send({ count: 0, suppliers });
    };
    
    const containers = await Container.aggregate([{ "$match": {"complete": false}}]).group({
      _id: "$supplier",
      count: { $sum: 1 }
    });
    
    const supplierSummary = suppliers.map((supplier) => {
      const count = containers.find((c) => c._id.toString() === supplier._id.toString());

      let object = {
        _id: supplier._id,
        supplierId: supplier.supplierId,
        name: supplier.name,
        enabled: supplier.enabled,
        updatedAt: supplier.updatedAt
      };

      if (count) {
        object = { ...object, activeContainerCount: count.count}
      } else {
        object = { ...object, activeContainerCount: 0 };
      }

      return object;

    });

    res.status(200).send({ count: suppliers.length, suppliers: supplierSummary });

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

exports.upsertSupplier = async (req, res) => {
  try {
    console.log(req.body.supplier)
    let supplier = null;

    if (!req.body.supplier._id) {
      supplier = await Supplier.create(req.body.supplier)
      console.log(supplier)
      res.status(201).send({ message: "supplier created successfully" });
    } else {
      supplier = await Supplier.findOneAndUpdate(
        { [req.body.filterKey]: req.body.filterValue },
        { 
          supplierId: req.body.supplier.supplierId,
          name: req.body.supplier.name, 
          enabled: req.body.supplier.enabled 
        }
      );

      if (!supplier) {
        return res.status(404).send({ message: "supplier not found" });
      }
    };

    res.status(200).send({ message: "supplier updated successfully" });
  
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

