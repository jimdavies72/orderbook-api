const Reminder = require("./reminderModel");
const Supplier = require("../supplier/supplierModel");

exports.getReminders = async (req, res) => {
  try {
    let filter = null;
    if (req.body.includeDisabled == false) {
      filter = { enabled: true };
    }
    if (req.body.filterKey) {
      filter = {...filter, [req.body.filterKey]: req.body.filterValue }
    }

    const reminders = await Reminder.find(filter)

    if (!reminders) {
      return res.status(404).send({ title: "Something went wrong", message: "reminders not found" });
    }

    res.status(200).send({ reminders });
   
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.addReminder = async (req, res) => {
  try {
    const reminder = await Reminder.create(req.body);

    if (!reminder) {
     return res.status(404).send({ title: "Add reminder",message: "reminder could not be added" });
    }

    if (req.body.supplier) {
      const supplier = await Supplier.findById({ _id: reminder.supplier});
      supplier.reminders.push(reminder);
      await supplier.save();
    } else {
      return res.status(404).send({
        title: "Something went wrong",
        message: "The reminder was not added",
      });
    }

    res.status(201).send({
      title: "Add reminder",
      message: "The reminder was added successfully",
    });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const reminder = await Reminder.updateOne(filter, req.body.data);

    if (reminder.modifiedCount > 0) {
      return res
        .status(200)
        .send({
          title: "Update reminder",
          message: "The reminder was updated successfully",
        });
    }

    res
      .status(404)
      .send({
        title: "Something went wrong",
        message: "The reminder was not updated",
      });
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  };
};

exports.deleteReminder = async (req, res) => {
  try {
    const filter = { [req.body.filterKey]: req.body.filterValue };
    const reminder = await Reminder.deleteOne(filter);
    if (reminder.deletedCount > 0) {
      return res
        .status(200)
        .send({
          title: "Delete reminder",
          message: "The reminder was deleted successfully",
        });
    }
    res
      .status(404)
      .send({
        title: "Something went wrong",
        message: "The reminder was not deleted",
      });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
