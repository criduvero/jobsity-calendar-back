let ReminderModel = require('./reminderModel.js');
const aqp = require('api-query-params');

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

    /* const { filter, skip, limit, sort, projection, population } = aqp(req.query);
    
    ReminderModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .populate(population)
    .exec((err, reminders) => {
      if (err) {
        return res.status(500).json({
          message: `Error when getting reminders. ${err.message}`,
          error: err
        });
      }
      return res.status(200).json(reminders);
    }); */

    ReminderModel.find({ 'date.year': req.query.year, 'date.month': req.query.month }, (err, reminders) => {
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
			title : req.body.title,
			date : req.body.date,
			time : req.body.time,
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

      reminder.title = req.body.title ? req.body.title : reminder.title;
			reminder.date = req.body.date ? req.body.date : reminder.date;
			reminder.time = req.body.time ? req.body.time : reminder.time;
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
