const Supplier = require("./supplierModel");
const Container = require("../container/containerModel");
const { popOptions, isRo } = require("../utils/helperFunctions");

exports.getSupplierSummary = async (req, res) => {
  try {
    let filter = {};
    if (req.body.filterKey) {
      filter = { [req.body.filterKey]: req.body.filterValue };
    }

    const suppliers = await Supplier.find(filter).populate("reminders");

    if (isRo(suppliers)) {
      return res.status(404).send({ count: 0, suppliers });
    };
    
    const containers = await Container.aggregate([
      { $match: { complete: false } },
    ])
      .group({
        _id: "$supplier",
        count: { $sum: 1 },
      });

      
      const supplierSummary = suppliers.map((supplier) => {
        const count = containers.find((c) => c._id.toString() === supplier._id.toString());

        return {
          _id: supplier._id,
          supplierId: supplier.supplierId,
          name: supplier.name,
          reminders: supplier.reminders,
          activeContainerCount: count ? count.count : 0,
          enabled: supplier.enabled,
          updatedBy: supplier.updatedBy,
          updatedAt: supplier.updatedAt,
        };
      });

    res.status(200).send({ count: suppliers.length, suppliers: supplierSummary });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.getSuppliers = async (req, res) => {
  try {
    let filter = {};
    if (req.body.filterKey) {
      filter = { [req.body.filterKey]: req.body.filterValue };
    }

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
      {
        path: "orders",
        select: "-container",
        populate: { path: "comments", select: "-order" },
      }
    );

    const suppliers = await Supplier.find(filter)
      .populate(commentOptions)
      .populate(orderOptions)
      .populate("reminders");

    if (suppliers.length === 0) {
      return res.status(404).send({ count: 0, suppliers: suppliers });
    }

    res.status(200).send({ count: suppliers.length, suppliers: suppliers });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);

    if (isRo(supplier)){
      return res.status(201).send({ title: "Suppliers", message: "The supplier was added successfully" });
    };

    res.status(400).send({ title: "Suppliers", message: "The supplier was not added" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const filter = { [req.body.filterKey] : req.body.filterValue };

    const supplier = await Supplier.updateOne(filter, req.body.supplier)
    
    if (supplier.modifiedCount > 0) {
      return res.status(200).send({ title: "Suppliers", message: "The supplier was updated successfully" });
    }

    res.status(404).send({ title: "Suppliers", message: "The supplier was not updated" });

  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.deleteSupplier = async (req, res) => {
  try {
    const filter = { [req.body.filterKey] : req.body.filterValue };
    const supplier = await Supplier.deleteOne(filter);
    if (supplier.deletedCount > 0) {
      return res.status(200).send({ title: "Suppliers", message: "The supplier was deleted successfully" });
    }
    res.status(404).send({ title: "Suppliers", message: "The supplier was not deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

