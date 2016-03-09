var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RequestSchema = new Schema({
	creator: { type: Schema.Types.ObjectId, ref: "User" },
	created: { type: Date, default: Date.now },
	sessionYear: { type: String, required: 'SessionYear is required'},
	sumWin: { type: String, uppercase: true, required: 'Sum/Win is required'},
	department: { type: String, uppercase: true, required: 'Department is required'},
	courseNumber: { type: String, uppercase: true, required: 'Course Number is required'},
	courseSession: { type: String, uppercase: true, required: 'Course Session is required'},
	isRestricted: { type: Boolean, required: 'isRestricted is required'},
	isChecked: { type: Boolean, default: false }
});

module.exports = mongoose.model('Request', RequestSchema);
