const express = require('express');
const app = express();
const data = require('./data');

app.use(express.static('public')); 

app.get('/getData', (req, res) => {
	res.send(data);
});

app.get('/getResults', (req, res) => {
	console.log(req.query);
	res.send(req.query);
})

app.listen(3000, () => {
	console.log("Listening");
});