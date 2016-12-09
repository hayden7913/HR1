const express = require('express');
const app = express();
const bp = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

app.use(bp.json());
app.use(express.static('public')); 

let db;

app.get('/getData', (req, res) => {



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

				console.log(items);

			});
	
});

app.get('/getFilters', (req, res) => {

	/*let data;
	db.collection('hrtest').find().toArray(
		function(err, results){
			data = results;
			console.log(data);
		});*/
	let filters = req.query;

	db.collection('hrtest')
 		//.find({city: filters.city, "category": { "$in": filters.category}})
 		.find( Boolean(filters.category) ? {city : filters.city, category : {"$in" : filters.category}} : {city : filters.city})
		.toArray(function(err, results){
			res.send(results);
		});	

	/*if(filters.category){
		db.collection('hrtest')
 		//.find({city: filters.city, "category": { "$in": filters.category}})
 		.find(false ? {city : filters.city} : {category: {"$in": filters.category}})
		.toArray(function(err, results){
			console.log(results);
		});	
	} else {
		db.collection('hrtest')
 		.find({city: filters.city})
		.toArray(function(err, results){
			console.log(results);
		});	
	}
 	*/

	//.find({$and: [{city: filters.city}],[{$in: filters.category}]})

	/*let filteredData = data
		.filter(entry => entry.city === filters.city)
		.filter(entry => filters.category.findIndex( x => x === entry.category) > -1);
*/
	//res.send(filteredData);
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
		console.log(result);
		res.send(result);
	});
});


MongoClient.connect('mongodb://hayden321:1oneoaK!@ds127878.mlab.com:27878/hresources', (err, database) => {
	if (err) return console.log(err);
	db = database; 

	

	app.listen(3000, () => {
		console.log("Listening");
	});
});