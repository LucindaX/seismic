#Package Server

This is an Express server used as our back-end to be used in conjunction with the `lib_checker` gem . The server recieves a list of gems and returns the system libraries needed to be installed for these gems to work correctly .

##Installation

First , you have to make sure `nodejs npm mongodb` are installed on your machine .

Pull the directory , enter and run :
```
$ npm install
```
now you'll have a `node_modules` directory created with the project modules

Next you'll need to provide the database with some mock data in the database if you wish to test the API . There is a seed file included `seed.json` which has an array of JSON objects representing the Gem model . To populate the DB collection with this seed , run the following :

```
$ mongoimport --db pkserver --collection gems --drop --file seed.json --jsonArray
```

make sure `mongod` is running which is the mongodb daemon . Run the following command to run the server

```
$ npm start
```
##Usage

This server needs to be running for the `lib_checker` gem to run correctly .So you'd need to this server first and then try the gem for testing .

##Development

The server is a typical Express server with `server.js` as its entry . It sets up the configuration and initializes middleware used in the project . 

```javascript
app.use('/api', require('./routes/api'));
```
This line of code in `server.js` is where it directs incoming requests for our API to `routes/api.js` where we wrote our API functionality for retrieving packages and saving gems to DB .

Next , we have `models/Gem.js` which contains the Schema for the Gem model 

```javascript
var GemSchema = new mongoose.Schema({
	name: {type: String, unique: true, index: true},
	os:[{
		distId: {type: String, required: true},
		release: {type: String, required: true},
		arch: {type: String, required: true},
		packages: [String]
	 }]
});
```
This Schema assumes the following structure , that each Gem has a name , and "os" which is an array od distribution that this gems is compatible with . So for example gem "X" is available on "OS X" , "Ubuntu" , "CentOS" . Each of these have their own release ( version ) , and machine architecture which can dictate the system libraries to download , so each OS has its own system packages or libraries for this gem to work . Because it's very complicated to add in terms of distribution , its release and architecture , for the sake of simplicity for our example I've assumed that we're only interested in the distribution ie. ( "OS X" , "Ubuntu" .... ) for our work .

Now on to the API . `routes/api.js` contains our express router which has two APIs of concern .

`#POST /api/packages` : this API is called from our gem with the gem list and we respond wit the packages list . Gems are sent along with machine info ( distribution , release , arch ) , and when gems are retrieved we make sure that they correspond to the detected OS and therefore its packages or else we skip it . An example of the object sent :
```javascript
{ 
	"gems": ["http", "rspec", "fleet"],
	"machine_info": ["Ubuntu", "12.04", "trusty", "i86"]
}
```

`#POST /api/gem` : this saves a new gem to DB . An example of the object sent :
```javascript
{ "gem": {
	"name": "http",
	"os": [{
		"distId": "Ubuntu",
		"release": "12.04",
		"arch": "i68",
		"packages": ["lib-dev", "x-server"]
		},
		{
			"distId": "OS X",
			"release": "1.2.1",
			"arch": "x64",
			"packages": ["firebug", "lib-clear"]
		}]

	}
}
```
The code is very simple , clear and documented .

## License 
The code is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

