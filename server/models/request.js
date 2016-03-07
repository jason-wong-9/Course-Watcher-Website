var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RequestSchema = new Schema({
	creator: { type: Schema.Types.ObjectId, ref: "User" },
	created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', RequestSchema);