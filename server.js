const express = require('express');
const app = express();
const data = require('./data');

app.use(express.static('public')); 

app.get('/getData', (req, res) => {

	let items = {};
	let cities = data.map(entry => entry.city);
	let cats = data.map(entry => entry.category);

	items.select = cities
	.filter((entry, idx) => {return cities.indexOf(entry) == idx})	
	
	items.checkBoxes = cats
	.filter((entry, idx) => {return cats.indexOf(entry) == idx})	

	res.send(items);
});f

app.get('/getFilters', (req, res) => {
	let filters = req.query

	let filteredData = data
		.filter(entry => entry.city === filters.city)
		.filter(entry => filters.category.findIndex( x => x === entry.category) > -1);
	console.log(filteredData);

	res.send(req.query);
})

app.listen(3000, () => {
	console.log("Listening");
});