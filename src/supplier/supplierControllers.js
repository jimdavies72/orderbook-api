const Supplier = require("./SupplierModel");

exports.getSuppliersList = async (req, res) => {
  try {
    const data = await Supplier.find({}, "supplierId, name");

    if (data.length === 0) {
      res.status(404).send({ count: 0, data });
      return;
    }
    res.status(200).send({ count: data.length, data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getSupplier = async (req, res) => {
  try {
    const data = await Supplier.find(
      {
        [req.body.filterKey]: req.body.filterValue,
      },
      "supplierId, name"
    );

    if (data.length === 0) {
      res.status(404).send({ count: 0, data });
      return;
    }
    res.status(200).send({ count: data.length, data });
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
      { [req.body.filter.filterKey]: req.body.filter.filterValue },
      {
        name: req.body.data.name,
      },
      { new: true }
    );

    res.status(200).send({ supplier: supplier });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// exports.updateMultiTasks = async (req, res) => {
//   try {
//     const updateQueries = [];
//     req.body.data.forEach((item) => {
//       updateQueries.push({
//         updateOne: {
//           filter: { userId: req.body.userId, _id: item._id },
//           update: { completed: req.body.completed },
//         },
//       });
//     });

//     const result = await Task.bulkWrite(updateQueries);
//     res.status(200).send({ count: result });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

// exports.deleteSingleTask = async (req, res) => {
//   try {
//     const task = await Task.deleteOne({
//       [req.body.filterKey]: req.body.filterValue,
//     });

//     if (task.deletedCount === 0) {
//       res.status(404).send({ error: "task not found" });
//       return;
//     }
//     res.status(204).send("");
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

// exports.deleteMultiTasks = async (req, res) => {
//   try {
//     const deleteQueries = [];
//     req.body.data.forEach((item) => {
//       deleteQueries.push({
//         deleteOne: {
//           filter: { userId: req.body.userId, _id: item._id },
//         },
//       });
//     });

//     const result = await Task.bulkWrite(deleteQueries);
//     res.status(200).send({ count: result });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };
