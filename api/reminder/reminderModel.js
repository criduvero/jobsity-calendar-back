let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reminderSchema = new Schema({
	'text' : { type : String, required: [true, 'Reminder text is required'] },
	'date' : String,
	'year' : { type : Number, required: [true, 'Reminder year is required'] },
	'month' : { type : Number, required: [true, 'Reminder month is required'] },
	'color' : { type : String, required: [true, 'Reminder color is required'] },
	'city' : String
});

module.exports = mongoose.model('Reminder', reminderSchema);
