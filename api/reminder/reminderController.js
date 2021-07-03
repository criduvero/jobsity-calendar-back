let ReminderModel = require('./reminderModel.js');

/**
 * reminderController.js
 *
 * @description :: Server-side logic for managing reminders.
 */
module.exports = {

  /**
   * reminderController.list()
   */
  list: (req, res) => {
    ReminderModel.find((err, reminders) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting reminders.',
          error: err
        });
      }
      return res.status(200).json(reminders);
    });
  },

  /**
   * reminderController.show()
   */
  show: (req, res) => {
    let id = req.params.id;
    ReminderModel.findOne({_id: id}, (err, reminder) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting reminder.',
          error: err
        });
      }
      if (!reminder) {
        return res.status(404).json({
          message: 'No such reminder'
        });
      }
      return res.status(200).json(reminder);
    });
  },

  /**
   * reminderController.create()
   */
  create: (req, res) => {
    let reminder = new ReminderModel({
			text : req.body.text,
			date : req.body.date,
			year : req.body.year,
			month : req.body.month,
			color : req.body.color,
			city : req.body.city
    });

    reminder.save((err, reminder) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating reminder',
          error: err
        });
      }
      return res.status(201).json(reminder);
    });
  },

  /**
   * reminderController.update()
   */
  update: (req, res) => {
    let id = req.params.id;
    ReminderModel.findOne({_id: id}, (err, reminder) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting reminder',
          error: err
        });
      }
      if (!reminder) {
        return res.status(404).json({
          message: 'No such reminder'
        });
      }

      reminder.text = req.body.text ? req.body.text : reminder.text;
			reminder.date = req.body.date ? req.body.date : reminder.date;
			reminder.year = req.body.year ? req.body.year : reminder.year;
			reminder.month = req.body.month ? req.body.month : reminder.month;
			reminder.color = req.body.color ? req.body.color : reminder.color;
			reminder.city = req.body.city ? req.body.city : reminder.city;
			
      reminder.save((err, reminder) => {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating reminder.',
            error: err
          });
        }
        return res.status(200).json(reminder);
      });
    });
  },

  /**
   * reminderController.remove()
   */
  remove: (req, res) => {
    let id = req.params.id;
    ReminderModel.findByIdAndRemove(id, (err, reminder) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the reminder.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
