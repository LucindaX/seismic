var mongoose = require('mongoose');

var GemSchema = new mongoose.Schema({
	name: {type: String, unique: true, index: true},
	os:[{
		distributionId: {type: String, required: true},
		release: {type: String, required: true},
		arch: {type: String, required: true},
		packages: [String]
	}]
});

module.exports = mongoose.model('Gem', GemSchema);

