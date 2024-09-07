const { validateAccessToken } = require("../middleware/auth0.middleware");
const { Router } = require("express");

const {
  addReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} = require("./reminderControllers");

const { allowDeleteReminder } = require("../middleware");

const reminderRouter = Router();

// add
reminderRouter.post("/reminders", validateAccessToken, addReminder);
// get
reminderRouter.patch("/reminders", validateAccessToken, getReminders);
//update
reminderRouter.put("/reminders/update", validateAccessToken, updateReminder);
//delete
reminderRouter.put(
  "/reminders/delete",
  validateAccessToken,
  allowDeleteReminder,
  deleteReminder
);

module.exports = reminderRouter;