var margin = {top: 20, right: 30, bottom: 70, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
	.range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();    

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

queue()
	.defer(d3.json, '2015.json')
	//.defer(d3.json, '2014.json')
	.await(analyze); // function that uses the files

function analyze (error, data2015) {
	if (error) { console.log(error); }
    console.log(data2015);



};	