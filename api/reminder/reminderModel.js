let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reminderSchema = new Schema({
	'title' : { type : String, required: [true, 'Reminder title is required'] },
	'date' : {
		year: Number,
		month: Number,
		day: Number 
	},
	'time' : { 
		hour: Number,
		minute: Number
	},
	'color' : { type : String, required: [true, 'Reminder color is required'] },
	'city' : String
});

module.exports = mongoose.model('Reminder', reminderSchema);
