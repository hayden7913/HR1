/*const data = [
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
]*/

const renderHtml = (filterItems) => {

	let select = filterItems.select
	.map(entry => `<option value="${entry}">${entry}</option>`);

	let checkBoxes = filterItems.checkBoxes
	.map(entry => `<input type="checkbox" value="${entry}">${entry}`);
	
	$("select").html(select);
	$("#check").html(checkBoxes);
}

const renderResults = (filteredData) => {
	$("#results").text(JSON.stringify(filteredData));		 	
}


const processData = (filterItems) => {
	renderHtml(filterItems);
	initSubmitHandler(filterItems);
}

const getData = () => {
	$.get("/getData", undefined, processData);
}

const callback = (filteredData) => {
	renderResults(filteredData);		 	
}

const initSubmitHandler = (data) => {
	$("form").on("submit", (e) => {
	e.preventDefault();

	let filters = {};
	let city = $("select").val();
	let checked = [];
	$("#check :checked").each( function() {
		checked.push($(this).val());
	});	

	filters.city = city;
	filters.category = checked;

	$.getJSON('/getFilters', filters, callback);

	renderResults(data, filters);

	});

}

const main = () => {
	getData();

}

$(main);
