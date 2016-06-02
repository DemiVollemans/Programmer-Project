queue()
	.defer(d3.json, '2015.json')
	.defer(d3.json, '2014.json')
	.await(analyze); // function that uses the files

function analyze (error, data2015, data2014) {
	if (error) { console.log(error); }
	console.log(data2015);

};	