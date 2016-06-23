function lineGraph (data) {
    var margin = {top: 30, right: 40, bottom: 70, left: 80},
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y").parse;

    var x = d3.time.scale()
            .range([0, width]),
        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(5)
            .innerTickSize(-height)
            .outerTickSize(0)
            .tickPadding(10);

    var y0 = d3.scale.linear()
            .range([height, 0]),
        yAxisLeft = d3.svg.axis()
            .scale(y0)
            .orient("left")
            .ticks(5)
            .innerTickSize(-width)
            .outerTickSize(0)
            .tickPadding(10);

    var y1 = d3.scale.linear()
            .range([height, 0]),
        yAxisRight = d3.svg.axis()
            .scale(y1)
            .orient("right")
            .ticks(5);

    //define value line
    var line1 = d3.svg.line()
        .interpolate("basis")
        .x(function (d) { return x(d.year); })
        .y(function (d) { return y0(d.value); });

    //define other line
    var line2 = d3.svg.line()
        .interpolate("basis")
        .x(function (d) { return x(d.year);})
        .y(function (d) { return y1(d.prices) }); // dit moet cummulatief worden

    var svg = d3.select("body")
        .append("svg")
        .attr("id", "newline2")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //reformat the data
    var formatdata = [
        {year : "2010", prices: data.numb2010, value: data.val2010},
        {year : "2011", prices: data.numb2011, value: data.val2011},
        {year : "2012", prices: data.numb2012, value: data.val2012},
        {year : "2013", prices: data.numb2013, value: data.val2013},
        {year : "2014", prices: data.numb2014, value: data.val2014},
        {year : "2015", prices: data.numb2015, value: data.val2015}
    ];

    formatdata.forEach(function (d) {
        d.year = parseDate(d.year);
        d.prices = +d.prices;
        d.value = +d.value;
    });

    x.domain(d3.extent(formatdata, function (d) {return d.year; }));
    y0.domain([0, d3.max(formatdata, function (d) {return Math.max(d.value); }) ]);
    y1.domain([0, d3.max(formatdata, function (d) {return Math.max(d.prices); }) ]); // dit moet cummulaties worden

    //add valueline1 path
    svg.append("path")
        .attr("class", "line")
        .transition()
        .duration(500)
        .attr("id", "purpleline")
        .style("stroke", "#a366ff")
        .attr("stroke-width", 4)
        .attr("d", line1(formatdata));
    console.log("boef");

    //add valueline 2 path
    svg.append("path")
        .attr("class", "line")
        .transition()
        .duration(1000)
        .attr("id", "yellowline")
        .style("stroke", "#ffff66")
        .style("fill", "none")
        .attr("stroke-width", 4)
        .attr("d", line2(formatdata));

    //add the x axis
    svg.append("g")
        // .transition()
        // .duration(1000)
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Year");

    // add the left y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxisLeft)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("stroke",  "#a366ff")
        .style("stroke-width", "0.05px")
        .text("Dollars ($)");

    //add right y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + " ,0)")
        .call(yAxisRight)
        .attr("stroke",  "#ffff66")
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("dy", ".71em")
        .call(yAxisLeft)
        .style("text-anchor", "end")
        .text("Championships won Overtime");

    svg.append("text")
        .attr("x", 0)
        .attr("y", height + margin.top + 10)
        .attr("class", "legend")
        .style("fill", "#a366ff")
        .text("Value Selected Team overtime in Billion Dollars");

    // Add the red line title
    svg.append("text")
        .attr("x", 0)
        .attr("y", height + margin.top + 30)
        .attr("class", "legend")
        .style("fill", "#ffff66")
        .text("Prices Won overtime by Selected Team");

}
