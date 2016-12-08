var express = require('express'),
	router = express.Router();

var Gem = require('../models/Gem');

router.post('/gem', function(req, res, next){
	var gem = req.body.gem;
	if ( gem.name == null || gem.name == '') 
		return res.status(400).send({ message: 'Gem name not present or invalid'});
	
	// check if gem already exists in DB else save it
	Gem.find({name: gem.name }).limit(1).exec(function(err, record){
		
		if(err) return next(err);

		if(record.name) 
			return res.status(409).send({ message: 'Aleady in DB' });
		else{
			// saving new gem
			(new Gem(gem)).save(function(err, record){
				
				if(err) return next(err);
				else return res.status(200).send({ message: 'Gem added' });

			});
		}
	});

});

module.exports = router;
