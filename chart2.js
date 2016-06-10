var margin = {top: 30, right: 40, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

var xScale = d3.time.scale()
    .range([0, width]),
xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var y0Scale = d3.scale.linear()
    .range([height, 0]),
yAxisLeft = d3.svg.axis().scale(y0)
    .orient("left").ticks(5);

var y1Scale = d3.scale.linear()
    .range([height, 0]),
yAxisRight = d3.svg.axis().scale(y1)
    .orient("right").ticks(5);

var valueline1 = d3.svg.line()
    .x(function (d) { return x(d.year); })
    .y(function (d) { return y0(d.prices); }); // dit moet cummulatief worden

var valueline2 = d3.svg.line()
    .x(function (d) { return x(d.year); })
    .y (function (d) {return x(d.valueTeam)});

var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.top + ")");
queue()
    .defer(d3.json, '2015_.json')
    .await(analyze);

function analyze (error, data) {
    if (error) {
        console.log(error);
    }
    data.forEach( function (d) {
        d.numb2010 = +d.numb2010;
        d.numb2011 = +d.numb2011;
        d.numb2012 = +d.numb2012;
        d.numb2013 = +d.numb2013;
        d.numb2014 = +d.numb2014;
        d.numb2015 = +d.numb2015;
        d.val2010 = +d.val2010;
        d.val2011 = +d.val2011;
        d.val2012 = +d.val2012;
        d.val2013 = +d.val2013;
        d.val2014 = +d.val2014;
        d.val2015 = +d.val2015;
    });

    
}    