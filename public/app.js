/*let data = [
	{
		"name": "Berkeley Free Clinic",
		"city": "Berkeley",
		"category": "Health" 
	},

	{
		"name": "Out fo the Closet",
		"city": "Oakland",
		"category": "Health"
	},

	{
		"name": "The Soup Kithen",
		"city": "Oakland",
		"category": "Food"
	}
];*/

const renderHtml= (data) => {

	let cities = data.map(entry => entry.city);
let cats = data.map(entry => entry.category);

	let select = cities
	.filter((entry, idx) => {return cities.indexOf(entry) == idx})	
	.map(entry => `<option value="${entry}">${entry}</option>`);

	let checkBoxes = cats
	.filter((entry, idx) => {return cats.indexOf(entry) == idx})	
	.map(entry => `<input type="checkbox" value="${entry}">${entry}`);
	
	$("select").html(select);
	$("#check").html(checkBoxes);
}

const processData = (data) => {
	renderHtml(data);
	initSubmitHandler();
}

const getData = () => {
	$.get("/getData", undefined, processData);
}

const renderResults = (data) => {
	console.log(data);
}

const initSubmitHandler = () => {
	$("form").on("submit", (e) => {
	e.preventDefault();

	let params = {};
	let city = $("select").val();
	let checked = [];
	$("#check :checked").each( function() {
		checked.push($(this).val());
	});	

	params.city = city;
	params.cats = checked;

	$.get("/getResults", params, renderResults);

	});

}

const main = () => {
	getData();
	//initSubmitHandler();

}

$(main);
