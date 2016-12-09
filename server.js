const express = require('express');
const app = express();
const bp = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

app.use(bp.json());
app.use(express.static('public')); 

let db, server;

app.get('/getData', (req, res) => {
	let data;
	
	db.collection('hrtest').find().toArray(
		function(err, results){
			data = results;
			let items = {};
			let cities = data.map(entry => entry.city);
			let cats = data.map(entry => entry.category);

			items.select = cities
			.filter((entry, idx) => {return cities.indexOf(entry) == idx})	
			
			items.checkBoxes = cats
			.filter((entry, idx) => {return cats.indexOf(entry) == idx})	

			res.send(items);

		});

});

app.get('/getFilters', (req, res) => {
	let filters = req.query;

	db.collection('hrtest')
 		.find( Boolean(filters.category) ? {city : filters.city, category : {"$in" : filters.category}} : {city : filters.city})
		.toArray(function(err, results){
			res.send(results);
		});	
});

app.post('/create', (req, res) => {

	db.collection('hrtest').save(req.body, (err, result) => {
		if (err) return console.log(err);
		console.log('saved to database');
		res.redirect('/')
	});
});

app.put('/update/:id', (req, res) => {
	console.log(req.params.id, req.body);
	db.collection('hrtest')
	.findOneAndUpdate({_id : ObjectId(req.params.id)}, {
		$set: {
			name: req.body.name,
			city: req.body.city,
			category: req.body.category
		} 
	}, (err, result) => {
		res.send(result);
	});
});


MongoClient.connect('mongodb://hayden321:1oneoaK!@ds127878.mlab.com:27878/hresources', (err, database) => {
	if (err) return console.log(err);
	db = database; 
	server = app.listen(process.env.PORT || 8080, () => {
		console.log("Listening");
	});
	
});

module.exports = server;
module.exports = app;