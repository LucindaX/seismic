var express = require('express'),
	router = express.Router();

var Gem = require('../models/Gem');
var _ = require('underscore');

/**
	#POST /api/gem
	add new gem to DB
*/
router.post('/gem', function(req, res, next){
	var gem = req.body.gem;
	if ( gem.name == null || gem.name == '') 
		return res.status(400).send({ message: 'Gem name not present or invalid'});
	
	// check if gem already exists in DB else save it
	Gem.find({name: gem.name }).limit(1).exec(function(err, record){
		
		if(err) return next(err);

		if(record.length){ 
			return res.status(409).send({ message: 'Aleady in DB' });
		}
		else{
			// saving new gem
			(new Gem(gem)).save(function(err, record){
				
				if(err) return next(err);
				else return res.status(200).send({ message: 'Gem added' });

			});
		}
	});

});


/**
	#POST /api/packages
	return required system libraries for gems 
*/
router.post('/packages', function(req, res, next){
	
	// get gems and machine info
	var gems = req.body.gems;
	var machine_info = req.body.machine_info;
	
	// return if machine info not provided
	if (machine_info.length == 0) return res.status(400).send({message: "Machine information missing"});

	var distId = machine_info[0];

	// find gems in DB
	Gem.find({ name: { $in: gems }}).exec(function(err, records){
		
		var aggregate = [];

		for(var i = 0; i < records.length; i++){
			// check if gem has listed packages for OS provided by machine_info
			var os = _.find(records[i].os, function(obj) { return obj.distId.toLowerCase() === distId.toLowerCase() });
			if(os){
				// add packages to the list
				console.log(os.packages);
				aggregate = aggregate.concat(os.packages);
			}
		}

		// cast list to set to eliminate any duplicate libraries needed between gems 
		var set = new Set(aggregate);
		res.send({ packages: Array.from(set) });
	
	});
	
});
		

module.exports = router;
