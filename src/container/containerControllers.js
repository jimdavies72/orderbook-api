const Supplier = require("../supplier/supplierModel");

exports.getContainerList = async (req, res) => {
  try {

    let filter = {}
    if (req.body.filterKey){
      filter = {
        [req.body.filter.filterKey]: req.body.filter.filterValue,
      };
    }
    const data = await Supplier.find(filter);

    if (data.length === 0) {
      res.status(404).send({ count: 0, data });
      return;
    }
    res.status(200).send({ count: data.length, data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getContainer = async (req, res) => {
  try {

    let filter = {
      [req.body.filterKey]: req.body.filterValue,
    };
    if (!req.body.includeComplete) {
      //we do want to filter out those that are complete
      filter.complete = false;
    };

    const supplier = await Supplier.findOne({
      containers: { $elemMatch: filter,
      },
    });

    if (!supplier) {
      res.status(404).send({ message: "container not found" });
      return;
    }

    const container = supplier.containers.find((item) => item[req.body.filterKey] === req.body.filterValue);

    res.status(200).send({ supplier: { supplierId: supplier.supplierId, name: supplier.name }, container });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addContainer = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.body._id);

    if (!supplier) {
      res.status(404).send({ error: "supplier not found" });
      return;
    }

    await supplier.containers.push(req.body.data);
    const data = await supplier.save();

    if (!data) {
      res.status(404).send({ error: "comment could not be added" });
      return;
    }
    res.status(201).send({ message: "container added" });
     
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateContainer = async (req, res) => {
  try {
    const Container = await Container.findOneAndUpdate(
      { [req.body.filter.filterKey]: req.body.filter.filterValue },
      {
        name: req.body.data.name,
      },
      { new: true }
    );

    if (Container) {
      const ContainerData = { ContainerId: Container.ContainerId, name: Container.name };
      res.status(200).send({ Container: ContainerData });
    } else {
      res.status(404).send({ error: "Container not found" });
    }
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
